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
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { IDateTimeValue } from '../model/date-time-value';
import { IGcObjects } from './models/gc-objects';

@Injectable()
export class HttpEndpointService implements IHttpEndpoint {
  private appName =  "argo-tests";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    return this.http
      .get<IGcObjects>(`${environment.googleCloudApiProjectInfo}`)
      .map<IGcObjects, IProject[]>((element: IGcObjects) => {
        console.log(element);
        return [];
        // return _.map(list, el => _.extend({}, el.data));
      });
  }
}
