import * as _ from 'lodash';
import * as dateFns from 'date-fns';
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
import { ICsvDataSource, EnumCsvDataSourceType } from '../model/csv-data-source';

@Injectable()
export class HttpEndpointService implements IHttpEndpoint {
  private appName =  "argo-tests";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    const getProjectId = (id: string): string => _.replace(id, new RegExp('=', 'g'), "");
    const getProjectName = (path: string): string => 
      ((nameSplit: string[]) => nameSplit.length == 2 ? _.first(nameSplit) : "")(_.split(path, "/"));
    const getCsvDataSourceName = (path: string): string => 
      ((nameSplit: string[]) => nameSplit.length == 2 ? _.replace(nameSplit[1], ".csv", "") : "")(_.split(path, "/"))

    return this.http
      .get<IGcObjects>(`${environment.googleCloudApiProjectInfo}`)
      .map<IGcObjects, IProject[]>((objects: IGcObjects) => {
          let result: IProject[] = [];
          for (let object of objects.items) {
            switch (object.contentType) {
              case "application/json":
                result.push(<IProject>{
                  id: getProjectId(object.crc32c),
                  name: getProjectName(object.name),
                  url: object.mediaLink,
                  csvDataSources: [],
                });
                break;
              }
            }
            for (let object of objects.items) {
              switch (object.contentType) {
                case "text/csv":
                  let project = _.find(result, el => el.name == getProjectName(object.name));
                  if (_.isObject(project)) {
                    project.csvDataSources.push(<ICsvDataSource> {
                      name: getCsvDataSourceName(object.name),
                      type: EnumCsvDataSourceType.NotClassified,
                      url: object.mediaLink
                    });
                  }
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
                  csvDataSources: _.map(project.csvDataSources, el => {
                    return _.extend(_.clone(el), <ICsvDataSource> {
                      type: ((flows: string[], rainfalls: string[]) => {
                        if (_.includes(flows, el.name))
                          return EnumCsvDataSourceType.Flow;
                        if (_.includes(rainfalls, el.name))
                          return EnumCsvDataSourceType.Rainfall;
                        return EnumCsvDataSourceType.NotClassified;
                      })(o["flows"], o["rainfalls"])
                    });
                  })
                });
              })
            );
        }
        return Observable.forkJoin(observablesInner);
      });
  }
}
