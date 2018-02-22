import { IDateTimeValue, IProject } from "@backend-service/model";

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