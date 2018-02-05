import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IProject } from "../model/project";
import { IArgoTimeSeries } from '../model/argo-time-series';
import { IDateTimeValue } from '../model/date-time-point';

export interface IHttpEndpoint {
  getProjects(): Observable<IProject[]>;
  add(project: IProject): Observable<IProject[]>;
  update(project: IProject): Observable<IProject[]>;
  delete(id: string): Observable<IProject[]>;
  formatFetchTimeSeriesUrl(channelId: string, dateFrom: string, dateTo: string): string;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');