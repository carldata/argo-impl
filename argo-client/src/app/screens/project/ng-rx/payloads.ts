import { Action } from "@ngrx/store";
import { ICsvRowObject } from "@backend-service/variants/contract";
import { IDateTimeValue } from "@backend-service/model";

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