import { Action } from "@ngrx/store";
import * as actionTypes from './action-types';
import { IProject } from "@backend-service/model";

export class FetchProjectsStartedAction implements Action {
  readonly type = actionTypes.FETCH_PROJECTS_STARTED
}

export class FetchProjectsSucceededAction implements Action {
  readonly type = actionTypes.FETCH_PROJECTS_SUCCEEDED;
  constructor(public projects: IProject[]) { }
}