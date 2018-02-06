import * as _ from 'lodash';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { IProject } from '../model/project';
import { IListItem } from '../model/list-item';
import { IHttpEndpoint } from './http-endpoint';
import { IDateTimeValue } from '../model/date-time-value';

@Injectable()
export class HttpEndpointMockService implements IHttpEndpoint {
  private projectsLoaded: boolean;
  private projects: IProject[];
  
  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    return _.isUndefined(this.projects) ? 
      this.http
        .get<IListItem[]>("assets/json/mock-projects.json")
        .map<IListItem[], IProject[]>((list: IListItem[]) => {
          this.projects = _.map(list, el => _.extend({}, el.data));
          return this.projects;
        }) :
      this.http
        .get<IListItem[]>("assets/json/mock-empty-array.json")
        .map<IListItem[], IProject[]>((list: IListItem[]) => this.projects)
  }
}
