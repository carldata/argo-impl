import { Action } from "@ngrx/store";
import * as actionTypes from './action-types';
import { IPredictionsTabFetchDataSucceededPayload, IPredictionsTabFetchDataStartedPayload } from "./payloads";
import { IProject } from "@backend-service/model";

export class PredictionsDateChangedAction implements Action {
  readonly type = actionTypes.PREDICTIONS_TAB_DATE_CHANGED;
  constructor(public date: string) { } 
}

export class PredictionsFlowChannelChangedAction implements Action {
  readonly type = actionTypes.PREDICTIONS_TAB_FLOW_CHANNEL_CHANGED;
  constructor(public channel: string) { } 
}

export class PredictionsFetchDataStartedAction implements Action {
  readonly type = actionTypes.PREDICTIONS_TAB_FETCH_DATA_STARTED;
  constructor(public parameters: IPredictionsTabFetchDataStartedPayload) { }
}

export class PredictionsFetchDataSucceededAction implements Action {
  readonly type = actionTypes.PREDICTIONS_TAB_FETCH_DATA_SUCCEEDED;
  constructor(public data: IPredictionsTabFetchDataSucceededPayload) { }
}