import { IProject } from "./project";
import { IProjectScreenState } from "../screens/project/state";
import { IProjectsScreenState } from "../screens/projects/ng-rx/state";

export interface IAppState {
  projectsScreenState: IProjectsScreenState;
  // projectScreenState: IProjectScreenState;
}