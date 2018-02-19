import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as actionTypes from './action-types';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BackendService } from '../../../services/backend/index';
import { IProject } from '../../../model/project';
import { ActionWithPayload } from '../../../ng-rx/default-actions';
import { IFetchTimeSeriesPayload } from './actions';
import { IDateTimeValue } from '../../../model/date-time-value';

@Injectable()
export class ProjectScreenEffects {
  constructor(
    private backendService: BackendService,
    private actions$: Actions
  ) { }

  @Effect() getTimeSeries$: Observable<ActionWithPayload<IDateTimeValue[]>> = this.actions$.pipe(
    ofType(actionTypes.PREDICTIONS_FETCH_TIME_SERIES_STARTED),
    mergeMap((action: ActionWithPayload<IFetchTimeSeriesPayload>) => 
      this.backendService.getTimeSeries(action.payload.url, action.payload.date, action.payload.mapRawElement).pipe(
        map((timeSeries: IDateTimeValue[]) => ({ 
          type: actionTypes.PREDICTIONS_FETCH_TIME_SERIES_SUCCEEDED, 
          payload: timeSeries 
        })),
        catchError((e) => of({ 
          type: actionTypes.PREDICTIONS_FETCH_TIME_SERIES_FAILED,
          payload: e }))
      )
    )
  );
}