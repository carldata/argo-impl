import * as dateFns from 'date-fns';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as actionTypes from './action-types';
import * as actions from './actions';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IPredictionsTabFetchDataSucceededPayload, IPredictionsTabFetchDataStartedPayload } from './payloads';
import { BackendService } from '@backend-service/.';
import { IDateTimeValue } from '@backend-service/model';
import { environment } from '@environments/environment';
import { GeneralErrorAction } from '@common/ng-rx/actions';

@Injectable()
export class ProjectScreenEffects {
  constructor(
    private backendService: BackendService,
    private actions$: Actions
  ) { }

  @Effect() getTimeSeries$: Observable<actions.PredictionsFetchDataSucceededAction|GeneralErrorAction> = this.actions$
    .pipe(
      ofType(actionTypes.PREDICTIONS_TAB_FETCH_DATA_STARTED),
      mergeMap((action: actions.PredictionsFetchDataStartedAction) => { 
        const timeSeriesObservable = this.backendService.getTimeSeries(
          action.parameters.timeSeriesUrl,
          dateFns.format(dateFns.addDays(action.parameters.date, -2), environment.dateFormat),
          action.parameters.date, 
          action.parameters.flowMap);
        const predictionsObservable = this.backendService.getPrediction(
          action.parameters.predictionsUrl,
          action.parameters.projectName, 
          action.parameters.channelName,
          action.parameters.date,
          action.parameters.predictionsMap);
        return Observable.forkJoin(timeSeriesObservable, predictionsObservable).pipe(
          map((results: IDateTimeValue[][]) => 
            new actions.PredictionsFetchDataSucceededAction({
              measuredFlow: results[0],
              predictionFlow: results[1]
            })
          ),
          catchError(e => of(new GeneralErrorAction(e)))
        )
      })
    );
}