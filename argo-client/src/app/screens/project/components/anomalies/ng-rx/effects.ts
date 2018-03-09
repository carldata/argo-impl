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
import { IUnixValue } from '@backend-service/model';
import { environment } from '@environments/environment';
import { GeneralErrorAction } from '@common/ng-rx/actions';

@Injectable()
export class ProjectScreenAnomaliesTabEffects {
  constructor(
    private backendService: BackendService,
    private actions$: Actions
  ) { }


  /**
   * Anomalies generally are not continous time-series, since it must be presented as "series of series"
   * applying "fragment" indexing built-in in time series chart
   */
  private normalizeAnomalies = (baseTimeSeries: IUnixValue[], anomalies: IUnixValue[]): IUnixValue[][] => {
    let result = [];
    let anomaliesNormalized: IUnixValue[] = _.map(baseTimeSeries, el => <IUnixValue>{ 
      unix: el.unix, 
      value: (_.find(anomalies, a => a.unix == el.unix) || { value: null }).value
    });
    let tempArray = [];
    for (let i=0; i < anomaliesNormalized.length; i++) {
      if (_.isNumber(anomaliesNormalized[i].value))
        tempArray.push(anomaliesNormalized[i])
      if (_.isNull(anomaliesNormalized[i].value) && (!_.isEmpty(tempArray))) {
        result.push(tempArray);
        tempArray = [];
      }
    }
    if (!_.isEmpty(tempArray))
      result.push(tempArray);
    return result;
  }


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
              normalizedAnomalies: this.normalizeAnomalies(baseFlow, anomalies)
            })
          }
          ),
          catchError(e => of(new GeneralErrorAction(e)))
        )
      })
    );
}