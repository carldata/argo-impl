import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IDateTimeValue, IProject } from '@backend-service/model';

export type ICsvRowObject = any;

export interface IHttpEndpoint {
  getProjects(): Observable<IProject[]>;
  getTimeSeries(url: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]>
  getPrediction(url: string, projectName: string, channelName: string, date: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');