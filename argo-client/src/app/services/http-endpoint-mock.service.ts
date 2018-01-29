import * as _ from 'lodash';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { IArgoProject } from '../model/argo-project';
import { IListItem } from '../model/list-item';
import { IHttpEndpoint } from './http-endpoint';
import { IArgoTimeSeries } from '../model/argo-time-series';
import { IDateTimeValue } from '../model/date-time-point';

@Injectable()
export class HttpEndpointMockService implements IHttpEndpoint {
  private projectsLoaded: boolean;
  private projects: IArgoProject[];
  
  constructor(private http: HttpClient) { }

  getProjects(): Observable<IArgoProject[]> {
    return _.isUndefined(this.projects) ? 
      this.http
        .get<IListItem[]>("assets/json/mock-projects.json")
        .map<IListItem[], IArgoProject[]>((list: IListItem[]) => {
          this.projects = _.map(list, el => _.extend({}, el.data));
          return this.projects;
        }) :
      this.http
        .get<IListItem[]>("assets/json/mock-empty-array.json")
        .map<IListItem[], IArgoProject[]>((list: IListItem[]) => this.projects)
  }

  add(project: IArgoProject): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>("assets/json/mock-empty-array.json")
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => {
        this.projects = _.concat(this.projects, [project]);
        return this.projects;
      });
  }

  update(project: IArgoProject): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>("assets/json/mock-empty-array.json")
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => {
        let projectFound = _.find(this.projects, el => el.id == project.id);
        if (_.isObject(projectFound)) {
          projectFound.name = project.name;
          projectFound.inputChannelId = project.inputChannelId;
          projectFound.outputChannelId = project.outputChannelId;
        }
        return this.projects;
      });
  }

  delete(id: string): Observable<IArgoProject[]> {
    return this.http
      .get<IListItem[]>("assets/json/mock-empty-array.json")
      .map<IListItem[], IArgoProject[]>((list: IListItem[]) => {
        this.projects = _.filter(this.projects, el => el.id != id);
        return this.projects;
      });
  }

  formatFetchTimeSeriesUrl(channelId: string, dateFrom: string, dateTo: string): string {
    return "assets/json/mock-time-series.csv";
  }
}
