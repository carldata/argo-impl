import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint, ICsvRowObject } from './contract';
import { environment } from '@environments/environment';
import { IGcObjects, IProject, ICsvDataSource, EnumCsvDataSourceType, IDateTimeValue } from '@backend-service/model';
import { Store } from '@ngrx/store';
import { IAppState } from '@app-state/.';

@Injectable()
export class HttpEndpointService implements IHttpEndpoint {
  private appName =  "argo-tests";
  private cache: Map<string, IDateTimeValue[]> = new Map<string, IDateTimeValue[]>();

  constructor(private http: HttpClient) { }

  /**
   * Finds what projects are listed in the "argo-projects" bucket. 
   * Project objects are just initialized/created, but not fully,
   * e.g. dates cannot be filled-in in this request. 
   * Some separate project http requests have to be made.
   */
  private fetchProjectsInGoogleCloudStorageObjectList(objects: IGcObjects): IProject[] {
    const getProjectName = (path: string): string => 
      ((nameSplit: string[]) => nameSplit.length == 2 ? _.first(nameSplit) : "")(_.split(path, "/"));
    const getCsvDataSourceName = (path: string): string => 
      ((nameSplit: string[]) => nameSplit.length == 2 ? _.replace(nameSplit[1], ".csv", "") : "")(_.split(path, "/"))

    let result: IProject[] = [];
    for (let object of objects.items) {
      switch (object.contentType) {
        case "application/json":
          result.push(<IProject>{
            id: getProjectName(object.name),
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
  }

  private fetchProjectDetails = (project: IProject): Observable<IProject> =>
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
      });

  public getProjects(): Observable<IProject[]> {
    return this.http
      .get<IGcObjects>(`${environment.googleCloudApiProjectInfoUrl}`)
      .map<IGcObjects, IProject[]>((objects: IGcObjects) => this.fetchProjectsInGoogleCloudStorageObjectList(objects))
      .switchMap<IProject[], IProject[]>((projects: IProject[]) =>
        Observable.forkJoin(
          _.reduce(projects, (list: Observable<IProject>[], p: IProject) => _.concat(this.fetchProjectDetails(p), list), [])
        ));
  }

  public getTimeSeries(url: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]> {
    let fromTimestamp = dateFns.getTime(new Date(dateFns.startOfDay(dateFrom)));
    let toTimestamp = dateFns.getTime(dateFns.endOfDay(dateTo));
    let papaParseConfig = (resolve) => _.extend({}, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: (results: ParseResult) => {
        let cacheEntry = _.map(results.data, map);
        this.cache.set(url, cacheEntry);
        resolve(cacheEntry);
      }
    });
    return Observable.from(new Promise((resolve, reject) =>
        this.cache.has(url) ? 
          resolve(this.cache.get(url)) :
          Papa.parse(url, papaParseConfig(resolve))
      ))
      .map((series: IDateTimeValue[]) => 
        _.filter(series, el => _.inRange(el.unix, fromTimestamp, toTimestamp))
      );
  }

  public getPrediction(url: string, projectName: string, channelName: string, date: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]> {
    let targetUrl = `${url}/${projectName}?flow=${channelName}&day=${date}`;
    let fromTimestamp = dateFns.getTime(new Date(date));
    let toTimestamp = dateFns.getTime(dateFns.addDays(new Date(date), 1));
    let papaParseConfig = (resolve) => _.extend({}, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: (results: ParseResult) => 
        resolve(_.map(results.data, map)
        .filter((value) => _.inRange(value.unix, fromTimestamp, toTimestamp)))
    });
    return Observable.from(new Promise((resolve, reject) => Papa.parse(targetUrl, papaParseConfig(resolve))));
  }

  public getAnomalies(url: string, projectName: string, channelName: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]> {
    return Observable.of([]);
  }
}
