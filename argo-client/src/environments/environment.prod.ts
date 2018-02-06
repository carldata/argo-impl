import * as _ from "lodash";
import { IEnvironmentContract } from "./contract";
import { environment as defaultEnvironment } from "./environment";

export const environment: IEnvironmentContract = _.extend<IEnvironmentContract, IEnvironmentContract>(
  defaultEnvironment, <IEnvironmentContract> {
    production: true
  });