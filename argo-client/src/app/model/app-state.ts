import { IProject } from "./project";
import { IProjectsScreenState } from "../screens/projects/ng-rx/state";
import { IProjectScreenState } from "../screens/project/ng-rx/state";

export interface IAppState {
  projectsScreenState: IProjectsScreenState;
  projectScreenState: IProjectScreenState;
}