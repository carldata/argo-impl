import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IUnixValue, IProject } from '@backend-service/model';

export type ICsvRowObject = any;

export interface IHttpEndpoint {
  getProjects(): Observable<IProject[]>;
  getTimeSeries(url: string, map: (el: ICsvRowObject) => IUnixValue, dateFrom?: string, dateTo?: string): Observable<IUnixValue[]>
  getPrediction(url: string, projectName: string, channelName: string, date: string, map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]>;
  getAnomalies(url: string, projectName: string, channelName: string, map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');