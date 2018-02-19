import { Action } from '@ngrx/store';
import { IProjectsScreenState } from './state';
import * as _ from 'lodash';
import { ProjectsLoadedAction } from './actions';
import { FETCH_PROJECTS_SUCCEEDED } from './action-types';

const defaultState: IProjectsScreenState = {
  projects: []
} 

export function projectsScreenReducer(state: IProjectsScreenState = defaultState, action: ProjectsLoadedAction): IProjectsScreenState {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCEEDED:
      return _.extend({}, state, <IProjectsScreenState>{ projects: action.payload });
    default:
      return state;
  }
}