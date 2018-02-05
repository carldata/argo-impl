import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint } from './http-endpoint';
import { IProject } from '../model/project';
import { IListItem } from '../model/list-item';
import { environment } from '../../environments/environment';
import { IArgoTimeSeries } from '../model/argo-time-series';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { IDateTimeValue } from '../model/date-time-point';

@Injectable()
export class HttpEndpointService implements IHttpEndpoint {
  private appName =  "argo-tests";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    return this.http
      .get<IListItem[]>(`${environment.hydraHttpApiEndpointAddress}/items?app=${this.appName}`)
      .map<IListItem[], IProject[]>((list: IListItem[]) => {
        return _.map(list, el => _.extend({}, el.data));
      });
  }

  add(project: IProject): Observable<IProject[]> {
    return Observable.concat(
      this.http
        .post(`${environment.hydraHttpApiEndpointAddress}/item?app=${this.appName}&id=${project.id}`, project, { responseType: 'text' })
        .map<string, IProject[]>((id: string) => []),
      this.getProjects());
  }

  update(project: IProject): Observable<IProject[]> {
    return this.http
      .post(`${environment.hydraHttpApiEndpointAddress}/item?app=${this.appName}&id=${project.id}`, project, { responseType: 'text' })
      .map<string, IProject[]>((id: string) => []);
  }

  delete(id: string): Observable<IProject[]> {
    return  Observable.concat(
      this.http
        .delete(`${environment.hydraHttpApiEndpointAddress}/item?app=${this.appName}&id=${id}`, { responseType: 'text' })
        .map<string, IProject[]>((id: string) => []),
      this.getProjects())
  }

  formatFetchTimeSeriesUrl(channelId: string, dateFrom: string, dateTo: string): string {
    return `${environment.hydraHttpApiEndpointAddress}/api/timeseries?id=${channelId}&startDate=${dateFrom}&endDate=${dateTo}`;
  }
}
