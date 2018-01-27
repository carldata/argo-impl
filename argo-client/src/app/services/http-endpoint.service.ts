import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint } from './http-endpoint';
import { Observable } from 'rxjs/Observable';
import { IArgoProject } from '../model/argo-project';
import { IListItem } from '../model/list-item';

@Injectable()
export class HttpEndpointService implements IHttpEndpoint {
  private hydraHttpApiServer = "http://localhost:8080";
  private appName =  "argo-tests";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>(`${this.hydraHttpApiServer}/items?app=${this.appName}`)
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => _.map(list, el => _.extend({}, el.data)));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.hydraHttpApiServer}/items?app=${this.appName}&id=${id}`);
  }
}
