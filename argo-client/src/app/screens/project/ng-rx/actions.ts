import { IDateTimeValue } from "../../../model/date-time-value";

export interface IFetchTimeSeriesPayload {
  url: string;
  date: string;
  mapRawElement: (el: any) => IDateTimeValue;
}