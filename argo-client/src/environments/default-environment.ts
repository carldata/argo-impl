import { IEnvironmentContract } from "./contract";

export const defaultEnvironment = <IEnvironmentContract> {
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm",
  production: false,
  mockHttp: false,
  predictionsBackendUrl: "http://35.198.143.98:8080/api/prediction",
  anomaliesBackendUrl: "http://35.198.143.98:8080/api/anomaly",
  googleCloudApiProjectInfoUrl: "https://www.googleapis.com/storage/v1/b/argo-projects/o",
}