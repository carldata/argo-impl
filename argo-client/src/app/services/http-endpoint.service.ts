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
      .map<IGcObjects, IProject[]>((objects: IGcObjects) => {
          let result: IProject[] = [];
          for (let object of objects.items) {
            switch (object.contentType) {
              case "application/json":
                result.push(<IProject>{
                  id: object.crc32c,
                  name: ((nameSplit: string[]) => nameSplit.length > 0 ? _.first(nameSplit) : "")(_.split(object.name, "/")),
                  url: object.mediaLink,
                  startDate: null,
                  endDate: null,
                  splitDate: null,
                  flows: [],
                  rainfalls: []
                });
                break;
              case "text/csv":
                break;
            }
          }
          return result;
        })
      .switchMap<IProject[], IProject[]>((projects: IProject[]) => {
        let observablesInner: Observable<IProject>[] = [];
        for (let project of projects) {
          observablesInner.push(
            this.http
              .get<Object>(project.url)
              .map<Object, IProject>((o: Object) => {
                return _.extend(project, <IProject> {
                  startDate: dateFns.parse(o["start-date"]),
                  endDate: dateFns.parse(o["end-date"]),
                  splitDate: dateFns.parse(o["split-date"]),
                  flows: o["flows"],
                  rainfalls: o["rainfalls"]
                });
              })
            );
        }
        return Observable.forkJoin(observablesInner);
      });
  }
}
