export interface IEnvironmentContract {
  production: boolean;
  mockHttp: boolean;
  dateFormat: string;
  dateTimeFormat: string;
  googleCloudApiProjectInfoUrl: string; 
  predictionsBackendUrl: string;
  anomaliesBackendUrl: string;
}