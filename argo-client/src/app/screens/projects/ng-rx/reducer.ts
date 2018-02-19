import { Action } from '@ngrx/store';
import { IProjectsScreenState } from './state';
import * as _ from 'lodash';
import { FETCH_PROJECTS_SUCCEEDED } from './action-types';
import { ActionWithPayload } from '../../../ng-rx/default-actions';
import { IProject } from '../../../model/project';

const defaultState: IProjectsScreenState = {
  projects: []
} 

export function projectsScreenReducer(state: IProjectsScreenState = defaultState, action: ActionWithPayload<IProject[]>): IProjectsScreenState {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCEEDED:
      return _.extend({}, state, <IProjectsScreenState>{ projects: action.payload });
    default:
      return state;
  }
}