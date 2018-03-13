import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from '@ngrx/store';
import * as actions from './actions';
import * as actionsTypes from './action-types';
import { IAnomaliesTabState } from './state';
import { environment } from '@environments/environment';

const anomaliesTabInitialState: IAnomaliesTabState = {  
  anomalies: [],
  normalizedAnomalies: [],
  baseFlow: [],
  editedFlow: [],
  flowChannel: null
}

const flowChannelChangedReducer = (state: IAnomaliesTabState, action: actions.AnomaliesFlowChannelChangedAction) =>
  _.extend({}, state, <IAnomaliesTabState> { flowChannel: action.channel });

const dataFetchedReducer = (state: IAnomaliesTabState, action: actions.AnomaliesFetchDataSucceededAction) =>
  _.extend({}, state, <IAnomaliesTabState> {
    anomalies: action.data.anomalies,
    normalizedAnomalies: action.data.groupedNormalizedAnomalies,
    baseFlow: action.data.baseFlow,
    editedFlow: action.data.editedFlow
  })

type AnomaliesTabActionTypes = actions.AnomaliesFlowChannelChangedAction|
                               actions.AnomaliesFetchDataSucceededAction;

function anomaliesTabReducer(state: IAnomaliesTabState = anomaliesTabInitialState, action: AnomaliesTabActionTypes): IAnomaliesTabState {
  switch (action.type) {
    case actionsTypes.ANOMALIES_TAB_FLOW_CHANNEL_CHANGED:
      return flowChannelChangedReducer(state, action);
    case actionsTypes.ANOMALIES_TAB_FETCH_DATA_SUCCEEDED:
      return dataFetchedReducer(state, action);
    default:
      return state;
  }
}

export {
  anomaliesTabInitialState,
  AnomaliesTabActionTypes,
  anomaliesTabReducer
}