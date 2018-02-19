import { IDateTimeValue } from "../../../model/date-time-value";
import { IProject } from "../../../model/project";

export interface IPredictionsTab {
  selectedFlowChannel: string;
  selectedDate: string;
  flow: IDateTimeValue[];
  predictions: IDateTimeValue[];
}

export interface IProjectScreenState {
  project: IProject;
  predictionsTab: IPredictionsTab;  
}