import { IDateTimeValue, IProject } from "@backend-service/model";

export interface IPredictionsTabState {
  flowChannel: string;
  date: string;
  flow: IDateTimeValue[];
  predictions: IDateTimeValue[];
}