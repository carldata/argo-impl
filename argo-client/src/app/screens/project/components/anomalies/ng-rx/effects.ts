import * as dateFns from 'date-fns';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { BackendService } from '@backend-service/.';
import { IUnixValue, ITimeSeries } from '@backend-service/model';
import { environment } from '@environments/environment';
import { GeneralErrorAction } from '@common/ng-rx/actions';

@Injectable()
export class ProjectScreenAnomaliesTabEffects {
  constructor(
    private backendService: BackendService,
    private actions$: Actions
  ) { }

  /**
   * Anomaly samples get indexed by given base time-series unix values 
   */
  private normalizeAnomalies = (baseTimeSeries: ITimeSeries, anomalies: ITimeSeries): ITimeSeries => 
    _.map(baseTimeSeries, el => <IUnixValue>{ 
      unix: el.unix, 
      value: (_.find(anomalies, a => a.unix == el.unix) || { value: null }).value
    });

  /**
   * Splits continous anomalies series into groups of time series.
   * Split criteria is based on null values detection.
   */
  private groupNormalizedAnomalies = (anomalies: ITimeSeries): ITimeSeries[] => 
    _.reduce(anomalies, (acc: { arrays: ITimeSeries[], lastValue: number }, sample: IUnixValue) => {
      if (!_.isNull(sample.value)) {
        if (_.isNull(acc.lastValue))
          return { arrays: _.concat(acc.arrays, [[sample]]), lastValue: sample.value };
        if (!_.isNull(acc.lastValue))
          return { 
            arrays: _.concat(_.slice(acc.arrays, 0, acc.arrays.length-1), 
                             [_.concat(_.last(acc.arrays), sample)]), 
            lastValue: sample.value 
          };
      }
      return { arrays: acc.arrays, lastValue: sample.value };
    }, { arrays: [], lastValue: null }).arrays;

   @Effect() getTimeSeries$: Observable<actions.AnomaliesFetchDataSucceededAction|GeneralErrorAction> = this.actions$
    .pipe(
      ofType(actionTypes.ANOMALIES_TAB_FETCH_DATA_STARTED),
      mergeMap((action: actions.AnomaliesFetchDataStartedAction) => { 
        const baseFlowTimeSeriesObservable = this.backendService.getTimeSeries(
          action.parameters.baseFlowTimeSeriesUrl,
          action.parameters.dateFrom, 
          action.parameters.dateTo, 
          action.parameters.flowMap);
        const editedFlowTimeSeriesObservable = this.backendService.getTimeSeries(
          action.parameters.editedFlowTimeSeriesUrl,
          action.parameters.dateFrom, 
          action.parameters.dateTo, 
          action.parameters.flowMap);
        const anomaliesObservable = this.backendService.getAnomalies(
          action.parameters.anomaliesUrl,
          action.parameters.projectName, 
          action.parameters.channelName,
          action.parameters.dateFrom, 
          action.parameters.dateTo, 
          action.parameters.anomaliesMap);
        return Observable.forkJoin(baseFlowTimeSeriesObservable, editedFlowTimeSeriesObservable, anomaliesObservable).pipe(
          map((results: IUnixValue[][]) => { 
            let [baseFlow, editedFlow, anomalies] = results;
            return new actions.AnomaliesFetchDataSucceededAction({
              baseFlow: baseFlow,
              editedFlow: editedFlow,
              anomalies: anomalies,
              groupedNormalizedAnomalies: this.groupNormalizedAnomalies(this.normalizeAnomalies(baseFlow, anomalies))
            })
          }),
          catchError(e => of(new GeneralErrorAction(e)))
        )
      })
    );
}