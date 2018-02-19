import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from '@ngrx/store';
import * as actionsTypes from './action-types';
import { ActionWithPayload } from '../../../ng-rx/default-actions';
import { IProjectScreenState, IPredictionsTab } from './state';
import { IDateTimeValue } from '../../../model/date-time-value';
import { IProject } from '../../../model/project';

const defaultState: IProjectScreenState = {
  predictionsTab: {
    flow: [],
    predictions: [],
    selectedDate: dateFns.format(new Date(), "YYYY-MM-DD"),
    selectedFlowChannel: null
  },
  project: null
}

export function projectScreenReducer(state: IProjectScreenState = defaultState, action: ActionWithPayload<IProject|Date|string|IDateTimeValue[]>): IProjectScreenState {
  switch (action.type) {
    case actionsTypes.SELECT_PROJECT:
    return _.extend({}, state, <IProjectScreenState> { 
        project: action.payload
      });
    case actionsTypes.PREDICTIONS_TAB_SELECTED_DATE_CHANGED:
      return _.extend({}, state, <IProjectScreenState> { 
        predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
          selectedDate: action.payload 
        })});
    case actionsTypes.PREDICTIONS_TAB_SELECTED_FLOW_CHANNEL_CHANGED:
      return _.extend({}, state, <IProjectScreenState> { 
        predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
          selectedFlowChannel: action.payload 
        })});
    case actionsTypes.PREDICTIONS_FETCH_TIME_SERIES_SUCCEEDED:
      return _.extend({}, state, <IProjectScreenState> { 
        predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
          flow: action.payload
        })});
    case actionsTypes.PREDICTIONS_FETCH_TIME_PREDICTIONS_SUCCEEDED:
      return _.extend({}, state, <IProjectScreenState> { 
        predictionsTab: _.extend({}, state.predictionsTab, <IPredictionsTab> {
          predictions: action.payload
        })});
    default:
      return state;
  }
}