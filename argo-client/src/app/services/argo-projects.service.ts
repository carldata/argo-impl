import 'rxjs/Rx';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IListItem } from '../model/list-item';
import { IArgoProject } from '../model/argo-project';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ArgoProjectsService {
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
