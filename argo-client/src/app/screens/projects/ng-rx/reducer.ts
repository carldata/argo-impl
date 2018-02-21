import { Action } from '@ngrx/store';
import { IProjectsScreenState } from './state';
import * as _ from 'lodash';
import { FETCH_PROJECTS_SUCCEEDED } from './action-types';
import { IProject } from '../../../model/project';
import { FetchProjectsSucceededAction } from './actions';

const defaultState: IProjectsScreenState = {
  projects: []
} 

export function projectsScreenReducer(state: IProjectsScreenState = defaultState, action: FetchProjectsSucceededAction): IProjectsScreenState {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCEEDED':
      return _.extend({}, state, <IProjectsScreenState>{ projects: action.projects });
    default:
      return state;
  }
}