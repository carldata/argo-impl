import { IDateTimeValue, IProject } from "@app-state/.";
import { IPredictionsTab } from "./predictions-tab";

export interface IProjectScreenState {
  project: IProject;
  predictionsTab: IPredictionsTab;
}