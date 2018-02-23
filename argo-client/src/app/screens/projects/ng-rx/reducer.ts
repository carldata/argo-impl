import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import { FETCH_PROJECTS_SUCCEEDED } from './action-types';
import { FetchProjectsSucceededAction } from './actions';
import { IProjectsScreenState } from '@app-state/.';

const defaultState: IProjectsScreenState = {
  projects: null
} 

export function projectsScreenReducer(state: IProjectsScreenState = defaultState, action: FetchProjectsSucceededAction): IProjectsScreenState {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCEEDED':
      return _.extend({}, state, <IProjectsScreenState>{ projects: action.projects });
    default:
      return state;
  }
}