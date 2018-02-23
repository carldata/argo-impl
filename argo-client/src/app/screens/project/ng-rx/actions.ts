import { Action } from "@ngrx/store";
import * as actionTypes from './action-types';
import { IProject } from "@backend-service/model";

export class SelectProjectAction implements Action {
  readonly type = actionTypes.SELECT_PROJECT;
  constructor(public project: IProject) { } 
}