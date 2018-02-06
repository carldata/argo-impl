import * as _ from 'lodash';
import * as dateFns from 'date-fns';
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
        .get<Object[]>("assets/json/mock-projects.json")
        .map<Object[], IProject[]>((elements: Object[]) => 
          _.reduce(elements, (items: IProject[], element: Object) =>  
            _.concat(items, [
              _.extend(element, <IProject> {
                startDate: dateFns.parse(element["startDate"]),
                endDate: dateFns.parse(element["endDate"]),
                splitDate: dateFns.parse(element["splitDate"])
              })]), [])):
      this.http
        .get<Object[]>("assets/json/mock-empty-array.json")
        .map<Object[], IProject[]>((list: Object[]) => this.projects)
  }
}
