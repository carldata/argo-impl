import { Action } from "@ngrx/store";
import { ICsvRowObject } from "@backend-service/variants/contract";
import { IUnixValue } from "@backend-service/model";

export interface IPredictionsTabFetchDataStartedPayload {
  timeSeriesUrl: string;
  predictionsUrl: string;
  date: string;
  flowMap: (el: ICsvRowObject) => IUnixValue;
  predictionsMap: (el: ICsvRowObject) => IUnixValue;
  projectName: string;
  channelName: string;
}

export interface IPredictionsTabFetchDataSucceededPayload {
  measuredFlow: IUnixValue[];
  predictionFlow: IUnixValue[];
}