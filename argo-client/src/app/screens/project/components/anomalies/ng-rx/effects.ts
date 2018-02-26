import * as dateFns from 'date-fns';
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
import { IDateTimeValue } from '@backend-service/model';
import { environment } from '@environments/environment';
import { GeneralErrorAction } from '@common/ng-rx/actions';

@Injectable()
export class ProjectScreenAnomaliesTabEffects {
  constructor(
    private backendService: BackendService,
    private actions$: Actions
  ) { }

  @Effect() getTimeSeries$: Observable<actions.AnomaliesFetchDataSucceededAction|GeneralErrorAction> = this.actions$
    .pipe(
      ofType(actionTypes.ANOMALIES_TAB_FETCH_DATA_STARTED),
      mergeMap((action: actions.AnomaliesFetchDataStartedAction) => { 
        const timeSeriesObservable = this.backendService.getTimeSeries(
          action.parameters.timeSeriesUrl,
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
        return Observable.forkJoin(timeSeriesObservable, anomaliesObservable).pipe(
          map((results: IDateTimeValue[][]) => 
            new actions.AnomaliesFetchDataSucceededAction({
              measuredFlow: results[0],
              anomalies: results[1]
            })
          ),
          catchError(e => of(new GeneralErrorAction(e)))
        )
      })
    );
}