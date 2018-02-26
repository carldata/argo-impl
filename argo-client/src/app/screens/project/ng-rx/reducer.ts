import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Action } from '@ngrx/store';
import * as actions from './actions';
import { IProjectScreenState } from './state';
import { environment } from '@environments/environment';
import { SELECT_PROJECT } from './action-types';
import * as predictionsTabActionTypes from '../components/predictions/ng-rx/action-types';
import * as anomaliesTabActionTypes from '../components/anomalies/ng-rx/action-types';
import { predictionsTabReducer, PredictionsTabActionTypes, predictionsTabInitialState } from '../components/predictions/ng-rx/reducer';
import { anomaliesTabInitialState, AnomaliesTabActionTypes, anomaliesTabReducer } from '../components/anomalies/ng-rx/reducer';

const initialState: IProjectScreenState = {
  predictionsTab: predictionsTabInitialState,
  anomaliesTab: anomaliesTabInitialState,
  project: null
}

const selectProjectReducer = (state: IProjectScreenState, action: actions.SelectProjectAction) =>
  _.extend({}, state, <IProjectScreenState> { 
    project: action.project,    
    predictionsTab: _.extend({}, state.predictionsTab, {
      flow: [],
      predictions: [],
      flowChannel: "",
    }),
    anomaliesTab: _.extend({}, state.anomaliesTab, {
      flow: [],
      anomalies: [],
      flowChannel: ""
    })
  });

type ActionTypes = actions.SelectProjectAction | PredictionsTabActionTypes | AnomaliesTabActionTypes;

export function projectScreenReducer(state: IProjectScreenState = initialState, action: ActionTypes): IProjectScreenState {
  switch (action.type) {
    case SELECT_PROJECT:
      return selectProjectReducer(state, action);
    case predictionsTabActionTypes.PREDICTIONS_TAB_DATE_CHANGED:
    case predictionsTabActionTypes.PREDICTIONS_TAB_FLOW_CHANNEL_CHANGED:
    case predictionsTabActionTypes.PREDICTIONS_TAB_FETCH_DATA_SUCCEEDED:
      return _.extend({}, state, <IProjectScreenState> {
        predictionsTab: predictionsTabReducer(state.predictionsTab, action)
      })
    case anomaliesTabActionTypes.ANOMALIES_TAB_DATE_FROM_TO_CHANGED:
    case anomaliesTabActionTypes.ANOMALIES_TAB_FLOW_CHANNEL_CHANGED:
    case predictionsTabActionTypes.ANOMALIES_TAB_FETCH_DATA_SUCCEEDED:
      return _.extend({}, state, <IProjectScreenState> {
        anomaliesTab: anomaliesTabReducer(state.anomaliesTab, action)
      })
    default:
      return state;
  }
}