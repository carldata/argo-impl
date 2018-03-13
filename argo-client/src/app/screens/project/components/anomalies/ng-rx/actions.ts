import { Action } from "@ngrx/store";
import * as actionTypes from './action-types';
import { IProject } from "@backend-service/model";
import { IAnomaliesTabFetchDataStartedPayload, IAnomaliesTabFetchDataSucceededPayload } from "./payloads";

export class AnomaliesFlowChannelChangedAction implements Action {
  readonly type = actionTypes.ANOMALIES_TAB_FLOW_CHANNEL_CHANGED;
  constructor(public channel: string) { } 
}

export class AnomaliesFetchDataStartedAction implements Action {
  readonly type = actionTypes.ANOMALIES_TAB_FETCH_DATA_STARTED;
  constructor(public parameters: IAnomaliesTabFetchDataStartedPayload) { }
}

export class AnomaliesFetchDataSucceededAction implements Action {
  readonly type = actionTypes.ANOMALIES_TAB_FETCH_DATA_SUCCEEDED;
  constructor(public data: IAnomaliesTabFetchDataSucceededPayload) { }
}