import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as Papa from 'papaparse';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { IHttpEndpoint, HTTP_ENDPOINT, ICsvRowObject } from './variants/contract';
import { ParseResult } from 'papaparse';
import { LoaderScreenService } from '../../loader-screen/loader-screen.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUnixValue, IProject } from '@backend-service/model';

@Injectable()
export class BackendService {
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

  public getPrediction(url: string, projectName: string, channelName: string, date: string, map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]> {
    return this.wrapObservable(this.httpEndpoint.getPrediction(url, projectName, channelName, date, map));
  }

  public getAnomalies(url: string, projectName: string, channelName: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]> {
    return this.wrapObservable(this.httpEndpoint.getAnomalies(url, projectName, channelName, dateFrom, dateTo, map));
  }

  public getTimeSeries(url: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]> {
    return this.wrapObservable<IUnixValue[]>(this.httpEndpoint.getTimeSeries(url, dateFrom, dateTo, map));
  }
}
