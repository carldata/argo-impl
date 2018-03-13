import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from '@ngrx/store';
import * as actions from './actions';
import * as actionsTypes from './action-types';
import { IPredictionsTabFetchDataSucceededPayload } from './payloads';
import { IPredictionsTabState } from './state';
import { environment } from '@environments/environment';

const predictionsTabInitialState: IPredictionsTabState = {
  flow: [],
  predictions: [],
  date: dateFns.format(new Date(), environment.dateFormat),
  flowChannel: null
}

const dateChangedReducer = (state: IPredictionsTabState, action: actions.PredictionsDateChangedAction) =>
  _.extend({}, state, <IPredictionsTabState> { date: action.date });

const flowChannelChangedReducer = (state: IPredictionsTabState, action: actions.PredictionsFlowChannelChangedAction) =>
  _.extend({}, state, <IPredictionsTabState> { flowChannel: action.channel });

const dataFetchedReducer = (state: IPredictionsTabState, action: actions.PredictionsFetchDataSucceededAction) =>
  _.extend({}, state, {
    flow: action.data.measuredFlow,
    predictions: action.data.predictionFlow,
  })

type PredictionsTabActionTypes = actions.PredictionsFetchDataStartedAction|
                                 actions.PredictionsFetchDataSucceededAction|
                                 actions.PredictionsDateChangedAction|
                                 actions.PredictionsFlowChannelChangedAction;

function predictionsTabReducer(state: IPredictionsTabState = predictionsTabInitialState, action: PredictionsTabActionTypes): IPredictionsTabState {
  switch (action.type) {
    case actionsTypes.PREDICTIONS_TAB_DATE_CHANGED:
      return dateChangedReducer(state, action);
    case actionsTypes.PREDICTIONS_TAB_FLOW_CHANNEL_CHANGED:
      return flowChannelChangedReducer(state, action);
    case actionsTypes.PREDICTIONS_TAB_FETCH_DATA_SUCCEEDED:
      return dataFetchedReducer(state, action);
    default:
      return state;
  }
}

export {
  predictionsTabInitialState,
  PredictionsTabActionTypes,
  predictionsTabReducer
}