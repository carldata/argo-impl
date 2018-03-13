import { IUnixValue, IProject } from "@backend-service/model";

export interface IPredictionsTabState {
  flowChannel: string;
  date: string;
  flow: IUnixValue[];
  predictions: IUnixValue[];
}