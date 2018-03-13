import { IUnixValue, IProject } from "@backend-service/model";
import { ITimeSeries } from "@backend-service/model/date-time-value";

export interface IAnomaliesTabState {
  flowChannel: string;
  baseFlow: ITimeSeries;
  editedFlow: ITimeSeries;
  anomalies: ITimeSeries;
  normalizedAnomalies: ITimeSeries[];
}