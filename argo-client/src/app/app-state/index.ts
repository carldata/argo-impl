
import { ICsvDataSource, EnumCsvDataSourceType } from "./csv-data-source";
import { IDateTimeValue } from "./date-time-value";
import { IListItem } from "./list-item";
import { IProject } from "./project";
import { IProjectsScreenState } from "./projects-screen";
import { IProjectScreenState } from "./project-screen";
import { IPredictionsTab } from "./project-screen/predictions-tab";

interface IAppState {
  projectsScreenState: IProjectsScreenState;
  projectScreenState: IProjectScreenState;
}

export { 
  ICsvDataSource,
  EnumCsvDataSourceType,
  IDateTimeValue,
  IListItem,
  IProject,
  IProjectsScreenState,
  IProjectScreenState,
  IPredictionsTab,
  IAppState
} 
