import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as Papa from 'papaparse';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { IListItem } from '../model/list-item';
import { IArgoProject } from '../model/argo-project';
import { tap } from 'rxjs/operators';
import { IHttpEndpoint, HTTP_ENDPOINT } from './http-endpoint';
import { IArgoTimeSeries } from '../model/argo-time-series';
import { ParseResult } from 'papaparse';
import { IDateTimeValue } from '../model/date-time-point';
import { LoaderScreenService } from '../loader-screen/loader-screen.service';
import { NotificationsService } from '../notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HydraHttpBackendService {
  private httpEndpoint: IHttpEndpoint;
  private loaderScreenService: LoaderScreenService;
  private notificationsService: NotificationsService;

  constructor(@Inject(HTTP_ENDPOINT) httpEndpoint: IHttpEndpoint, loaderScreenService: LoaderScreenService, notificationsService: NotificationsService) { 
    this.httpEndpoint = httpEndpoint;
    this.loaderScreenService = loaderScreenService;
    this.notificationsService = notificationsService;
  }

  private getErrorMessage(error): string {
    if (error instanceof HttpErrorResponse) 
      return error.message;
    return error;
  }

  /**
   * "Wraps" creating of an observable with: 
   * 1) orchestrating of showing/hiding a "loading" screen
   * 2) sending a notification message on successful or failed network operation 
   */
  private wrapObservable<T>(called: Observable<T>, successMessage?: string): Observable<T> {
    this.loaderScreenService.show();
    return called
      .catch((error, observable) => {
        this.loaderScreenService.hide();
        this.notificationsService.notify("error", this.getErrorMessage(error));
        return [];
      })
      .do(() => { 
        this.loaderScreenService.hide();
        if (_.isString(successMessage))
          this.notificationsService.notify("success", successMessage);
      });
  }
  
  public getProjects(): Observable<IArgoProject[]> {
    return this.wrapObservable(this.httpEndpoint.getProjects());
  }

  public add(project: IArgoProject): Observable<IArgoProject[]> {
    return this.wrapObservable(this.httpEndpoint.add(project), "Project added successfully");
  }

  public update(project: IArgoProject): Observable<IArgoProject[]> {
    return this.wrapObservable(this.httpEndpoint.update(project), "Project updated successfully");
  }

  public delete(id: string): Observable<IArgoProject[]> {
    return this.wrapObservable(this.httpEndpoint.delete(id), "Project deleted successfully");
  }

  private getTimeSeriesImplementation(project: IArgoProject, date: string): Observable<IArgoTimeSeries> {
    let dateFrom = dateFns.format(new Date(date), "YYYY-MM-DD 00:00:00");
    let dateTo = dateFns.format(dateFns.addDays(new Date(date), 1), "YYYY-MM-DD 00:00:00");
    let papaParseConfig = (resolve) => _.extend({}, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: (results: ParseResult) => {
        resolve(_.map(results.data, el => <IDateTimeValue> {
          unixTimestamp: new Date(el.time).getTime(),
          value: parseFloat(el.value)
        }));
      }
    });
    let parsedInputChannelPromise = new Promise((resolve, reject) => 
      Papa.parse(this.httpEndpoint.formatFetchTimeSeriesUrl(project.inputChannelId, dateFrom, dateTo), 
                 papaParseConfig(resolve)));
    let parsedOutputChannelPromise = new Promise((resolve, reject) => 
      Papa.parse(this.httpEndpoint.formatFetchTimeSeriesUrl(project.outputChannelId, dateFrom, dateTo), 
                 papaParseConfig(resolve)));
    this.loaderScreenService.show();
    return Observable.from(Promise.all([parsedInputChannelPromise, parsedOutputChannelPromise]).then((results) => {
      let [inputData, outputData] = results;
      return <IArgoTimeSeries> {
        inputChannelSeries: inputData,
        outputChannelSeries: outputData
      }
    }));
  }

  public getTimeSeries(project: IArgoProject, date: string): Observable<IArgoTimeSeries> {
    return this.wrapObservable<IArgoTimeSeries>(this.getTimeSeriesImplementation(project, date));
  }
}
