import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BackendService } from '../../../services/backend/index';
import { IProject } from '../../../model/project';
import { FailureNotificationAction, ActionWithPayload } from '../../../ng-rx/default-actions';
import { FETCH_PROJECTS_STARTED, FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_FAILED } from './action-types';

@Injectable()
export class ProjectsScreenEffects {
  constructor(
    private backendService: BackendService,
    private actions$: Actions
  ) {}

  @Effect() getProjects$: Observable<ActionWithPayload<IProject[]>|FailureNotificationAction> = this.actions$.pipe(
    ofType(FETCH_PROJECTS_STARTED),
    mergeMap(action => 
      this.backendService.getProjects().pipe(
        map((projects: IProject[]) => ({ 
          type: FETCH_PROJECTS_SUCCEEDED, 
          payload: projects 
        })),
        catchError((e) => of({ 
          type: FETCH_PROJECTS_FAILED,
          payload: e }))
      )
    )
  );
}