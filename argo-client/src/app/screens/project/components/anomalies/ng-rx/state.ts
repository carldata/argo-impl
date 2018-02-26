import { IDateTimeValue, IProject } from "@backend-service/model";

export interface IAnomaliesTabState {
  flowChannel: string;
  dateFrom: string;
  dateTo: string;
  flow: IDateTimeValue[];
  anomalies: IDateTimeValue[];
}