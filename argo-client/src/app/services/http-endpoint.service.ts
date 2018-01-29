import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint } from './http-endpoint';
import { IArgoProject } from '../model/argo-project';
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

  getProjects(): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>(`${environment.hydraHttpApiEndpointAddres}/items?app=${this.appName}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => _.map(list, el => _.extend({}, el.data)));
  }

  add(project: IArgoProject): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>(`${environment.hydraHttpApiEndpointAddres}/items?app=${this.appName}&id=${project.id}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => []); //TODO: implement !
  }

  update(project: IArgoProject): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>(`${environment.hydraHttpApiEndpointAddres}/items?app=${this.appName}&id=${project.id}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => []); //TODO: implement !
  }

  delete(id: string): Observable<IArgoProject[]> {
    return this.http
      .delete<IListItem[]>(`${environment.hydraHttpApiEndpointAddres}/items?app=${this.appName}&id=${id}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => []); //TODO: implement !
  }

  formatFetchTimeSeriesUrl(channelId: string, dateFrom: string, dateTo: string): string {
    return `${environment.hydraHttpApiEndpointAddres}/api/timeseries?id=${channelId}&startDate=${dateFrom}&endDate=${dateTo}`;
  }
}
