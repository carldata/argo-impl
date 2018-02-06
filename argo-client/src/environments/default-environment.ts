import { IEnvironmentContract } from "./contract";

export const defaultEnvironment = <IEnvironmentContract> {
  production: false,
  dateFormat: "YYYY-MM-DD",
  googleCloudApiProjectInfo: "https://www.googleapis.com/storage/v1/b/argo-projects/o",
  mockHttp: false
}