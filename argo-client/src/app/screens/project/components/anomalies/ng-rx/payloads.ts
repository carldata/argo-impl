import { Action } from "@ngrx/store";
import { ICsvRowObject } from "@backend-service/variants/contract";
import { IUnixValue, ITimeSeries } from "@backend-service/model";

export interface IAnomaliesTabFetchDataStartedPayload {
  baseFlowTimeSeriesUrl: string;
  editedFlowTimeSeriesUrl: string;
  anomaliesUrl: string;
  dateFrom: string;
  dateTo: string;
  flowMap: (el: ICsvRowObject) => IUnixValue;
  anomaliesMap: (el: ICsvRowObject) => IUnixValue;
  projectName: string;
  channelName: string;
}

export interface IAnomaliesTabFetchDataSucceededPayload {
  baseFlow: ITimeSeries;
  editedFlow: ITimeSeries;
  anomalies: ITimeSeries;
  groupedNormalizedAnomalies: ITimeSeries[];
}