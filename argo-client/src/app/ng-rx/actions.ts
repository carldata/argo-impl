import { Action } from "@ngrx/store";
import { GENERAL_ERROR } from './action-types';

export class GeneralErrorAction implements Action {
  readonly type = GENERAL_ERROR;
  constructor(public payload: any) { }
}