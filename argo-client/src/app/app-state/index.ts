import { IProjectsScreenState } from "../screens/projects/ng-rx/state";
import { IProjectScreenState, IPredictionsTab } from "../screens/project/ng-rx/state";

interface IAppState {
  projectsScreenState: IProjectsScreenState;
  projectScreenState: IProjectScreenState;
}

export {
  IAppState,
  IProjectScreenState,
  IProjectsScreenState,
  IPredictionsTab  
}