import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IProject } from "../../../model/project";
import { IDateTimeValue } from '../../../model/date-time-value';

export interface IHttpEndpoint {
  getProjects(): Observable<IProject[]>;
  getTimeSeries(url: string, date: string, mapRawElement: (el: any) => IDateTimeValue): Observable<IDateTimeValue[]>
  getPrediction(projectName: string, channelName: string, date: string): Observable<IDateTimeValue[]>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');