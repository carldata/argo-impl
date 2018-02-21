import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from '@ngrx/store';
import * as actions from './actions';
import * as actionsTypes from './action-types';
import { IProjectScreenState, IPredictionsTab } from './state';
import { IDateTimeValue } from '../../../model/date-time-value';
import { IProject } from '../../../model/project';
import { IPredictionsTabFetchDataSucceededPayload } from './payloads';

const defaultState: IProjectScreenState = {
  predictionsTab: {
    flow: [],
    predictions: [],
    selectedDate: dateFns.format(new Date(), "YYYY-MM-DD"),
    selectedFlowChannel: null
  },
  project: null
}
const selectProjectReducer = (state: IProjectScreenState, action: actions.SelectProjectAction) =>
  _.extend({}, state, <IProjectScreenState> { 
    project: action.project,
    predictionsTab: _.extend({}, state.predictionsTab, {
      flow: [],
      predictions: [],
      selectedFlowChannel: "",
    })
  });

const dateChangedReducer = (state: IProjectScreenState, action: actions.PredictionsDateChangedAction) =>
  _.extend({}, state, <IProjectScreenState> { 
    predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
      selectedDate: action.date
    })});

const flowChannelChangedReducer = (state: IProjectScreenState, action: actions.PredictionsFlowChannelChangedAction) =>
  _.extend({}, state, <IProjectScreenState> { 
    predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
      selectedFlowChannel: action.channel 
    })});

const dataFetchedReducer = (state: IProjectScreenState, action: actions.PredictionsFetchDataSucceededAction) =>
  _.extend({}, state, <IProjectScreenState> { 
    predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
      flow: action.data.measuredFlow,
      predictions: action.data.predictionFlow,
    })
  })

type ActionTypes = actions.PredictionsFetchDataStartedAction|
                   actions.PredictionsFetchDataSucceededAction|
                   actions.PredictionsDateChangedAction|
                   actions.PredictionsFlowChannelChangedAction|
                   actions.SelectProjectAction;

export function projectScreenReducer(state: IProjectScreenState = defaultState, action: ActionTypes): IProjectScreenState {
  switch (action.type) {
    case actionsTypes.SELECT_PROJECT:
      return selectProjectReducer(state, action);
    case actionsTypes.PREDICTIONS_TAB_SELECTED_DATE_CHANGED:
      return dateChangedReducer(state, action);
    case actionsTypes.PREDICTIONS_TAB_SELECTED_FLOW_CHANNEL_CHANGED:
      return flowChannelChangedReducer(state, action);
    case actionsTypes.PREDICTIONS_TAB_FETCH_DATA_SUCCEEDED:
      return dataFetchedReducer(state, action);
    default:
      return state;
  }
}