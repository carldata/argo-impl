import { IDateTimeValue } from "./date-time-point";

export interface IArgoTimeSeries {
  inputChannelSeries: IDateTimeValue[];
  outputChannelSeries: IDateTimeValue[];
}