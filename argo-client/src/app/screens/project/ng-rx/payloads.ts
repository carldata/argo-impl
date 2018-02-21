import { IDateTimeValue } from "../../../model/date-time-value";
import { Action } from "@ngrx/store";

export interface IPredictionsTabFetchDataStartedPayload {
  timeSeriesUrl: string;
  date: string;
  mapRawElement: (el: any) => IDateTimeValue;
  projectName: string;
  channelName: string;
}

export interface IPredictionsTabFetchDataSucceededPayload {
  measuredFlow: IDateTimeValue[];
  predictionFlow: IDateTimeValue[];
}