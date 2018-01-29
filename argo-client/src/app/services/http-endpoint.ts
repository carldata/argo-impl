import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IArgoProject } from "../model/argo-project";
import { IArgoTimeSeries } from '../model/argo-time-series';
import { IDateTimeValue } from '../model/date-time-point';

export interface IHttpEndpoint {
  getProjects(): Observable<IArgoProject[]>;
  add(project: IArgoProject): Observable<IArgoProject[]>;
  update(project: IArgoProject): Observable<IArgoProject[]>;
  delete(id: string): Observable<IArgoProject[]>;
  formatFetchTimeSeriesUrl(channelId: string, dateFrom: string, dateTo: string): string;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');