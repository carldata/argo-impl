import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as Papa from 'papaparse';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { IListItem } from '../model/list-item';
import { IProject } from '../model/project';
import { tap } from 'rxjs/operators';
import { IHttpEndpoint, HTTP_ENDPOINT } from './http-endpoint';
import { ParseResult } from 'papaparse';
import { IDateTimeValue } from '../model/date-time-value';
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
  
  public getProjects(): Observable<IProject[]> {
    return this.wrapObservable(this.httpEndpoint.getProjects());
  }

  private getTimeSeriesImplementation(url: string, date: string, mapRawElement: (el: any) => IDateTimeValue): Observable<IDateTimeValue[]> {
    let fromTimestamp = dateFns.getTime(new Date(date));
    let toTimestamp = dateFns.getTime(dateFns.addDays(new Date(date), 1));
    let papaParseConfig = (resolve) => _.extend({}, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: (results: ParseResult) => {
        resolve(_.map(results.data, mapRawElement)
                 .filter((value) => _.inRange(value.unixTimestamp, fromTimestamp, toTimestamp)));
      }
    });
    return Observable.from(new Promise((resolve, reject) => Papa.parse(url, papaParseConfig(resolve))));
  }

  public getTimeSeries(url: string, date: string, mapRawElement: (el: any) => IDateTimeValue): Observable<IDateTimeValue[]> {
    return this.wrapObservable<IDateTimeValue[]>(this.getTimeSeriesImplementation(url, date, mapRawElement));
  }
}
