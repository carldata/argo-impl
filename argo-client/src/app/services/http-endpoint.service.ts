import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint } from './http-endpoint';
import { Observable } from 'rxjs/Observable';
import { IArgoProject } from '../model/argo-project';
import { IListItem } from '../model/list-item';
import { environment } from '../../environments/environment';

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
      .get<IListItem[]>(`${environment.hydraHttpApiEndpointAddres}/items?app=${this.appName}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => []); //TODO: implement !
  }

  delete(id: string): Observable<IArgoProject[]> {
    return this.http
      .delete<IListItem[]>(`${environment.hydraHttpApiEndpointAddres}/items?app=${this.appName}&id=${id}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => []); //TODO: implement !
  }
}
