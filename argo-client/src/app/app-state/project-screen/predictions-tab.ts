import { IDateTimeValue } from "@app-state/date-time-value";

export interface IPredictionsTab {
  selectedFlowChannel: string;
  selectedDate: string;
  flow: IDateTimeValue[];
  predictions: IDateTimeValue[];
}