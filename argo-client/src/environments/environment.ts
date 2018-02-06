import * as _ from "lodash";
import { IEnvironmentContract } from "./contract";
import { defaultEnvironment } from "./default-environment";

export const environment: IEnvironmentContract = _.extend<IEnvironmentContract, IEnvironmentContract>(
  defaultEnvironment, <IEnvironmentContract> {});