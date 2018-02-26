import { Action } from "@ngrx/store";
import { ICsvRowObject } from "@backend-service/variants/contract";
import { IDateTimeValue } from "@backend-service/model";

export interface IAnomaliesTabFetchDataStartedPayload {
  timeSeriesUrl: string;
  anomaliesUrl: string;
  dateFrom: string;
  dateTo: string;
  flowMap: (el: ICsvRowObject) => IDateTimeValue;
  anomaliesMap: (el: ICsvRowObject) => IDateTimeValue;
  projectName: string;
  channelName: string;
}

export interface IAnomaliesTabFetchDataSucceededPayload {
  measuredFlow: IDateTimeValue[];
  anomalies: IDateTimeValue[];
}