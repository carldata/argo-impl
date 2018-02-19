import { IDateTimeValue } from "../../model/date-time-value";

export interface IChartState {
  flow: IDateTimeValue[];
  predictions: IDateTimeValue[];
}

export interface IProjectScreenState {
  selectedFlowChannel: string;
  selectedDate: Date;
  chartState: IChartState;
}