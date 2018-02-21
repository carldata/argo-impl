import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IProject } from '@app-state/.';
import { IDateTimeValue } from '@app-state/date-time-value';

export type ICsvRowObject = any;

export interface IHttpEndpoint {
  getProjects(): Observable<IProject[]>;
  getTimeSeries(url: string, date: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]>
  getPrediction(url: string, projectName: string, channelName: string, date: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');