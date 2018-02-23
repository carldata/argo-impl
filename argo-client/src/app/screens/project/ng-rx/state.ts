import { IDateTimeValue, IProject } from "@backend-service/model";
import { IPredictionsTabState } from "../components/predictions/ng-rx/state";
import { IAnomaliesTabState } from "../components/anomalies/ng-rx/state";

export interface IProjectScreenState {
  project: IProject;
  predictionsTab: IPredictionsTabState;
  anomaliesTab: IAnomaliesTabState;
}