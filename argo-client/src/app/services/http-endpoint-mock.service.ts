import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IArgoProject } from '../model/argo-project';
import { IListItem } from '../model/list-item';
import { IHttpEndpoint } from './http-endpoint';

@Injectable()
export class HttpEndpointMockService implements IHttpEndpoint {
  constructor(private http: HttpClient) { }

  getProjects(): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>("assets/json/mock-projects.json")
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => _.map(list, el => _.extend({}, el.data)));
  }

  delete(id: string): Observable<any> {
    return this.http
      .get<IListItem[]>("assets/json/mock-projects.json")
  }
}
