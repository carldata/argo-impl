import { IDateTimeValue } from "../../../model/date-time-value";
import { Action } from "@ngrx/store";
import { ICsvRowObject } from "../../../services/backend/variants/contract";

export interface IPredictionsTabFetchDataStartedPayload {
  timeSeriesUrl: string;
  predictionsUrl: string;
  date: string;
  flowMap: (el: ICsvRowObject) => IDateTimeValue;
  predictionsMap: (el: ICsvRowObject) => IDateTimeValue;
  projectName: string;
  channelName: string;
}

export interface IPredictionsTabFetchDataSucceededPayload {
  measuredFlow: IDateTimeValue[];
  predictionFlow: IDateTimeValue[];
}