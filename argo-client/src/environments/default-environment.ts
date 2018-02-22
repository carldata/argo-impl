import { IEnvironmentContract } from "./contract";

export const defaultEnvironment = <IEnvironmentContract> {
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm",
  production: false,
  mockHttp: false,
  predictionsBackendUrl: "http://35.198.115.94:8080/api/prediction",
  googleCloudApiProjectInfoUrl: "https://www.googleapis.com/storage/v1/b/argo-projects/o",
}