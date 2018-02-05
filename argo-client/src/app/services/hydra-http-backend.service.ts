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
  
  getProjects(): Observable<IArgoProject[]> {
    this.loaderScreenService.show();
    return this.httpEndpoint.getProjects()
      .do(() => { 
        this.loaderScreenService.hide();
        this.notificationsService.notify("success", "Project loaded successfully");
      });
  }

  add(project: IArgoProject): Observable<IArgoProject[]> {
    this.loaderScreenService.show();
    return this.httpEndpoint.add(project)
      .do(() => this.loaderScreenService.hide());
  }

  update(project: IArgoProject): Observable<IArgoProject[]> {
    this.loaderScreenService.show();
    return this.httpEndpoint.update(project)
      .do(() => this.loaderScreenService.hide());
  }

  delete(id: string): Observable<IArgoProject[]> {
    this.loaderScreenService.show();
    return this.httpEndpoint.delete(id)
     .do(() => this.loaderScreenService.hide());
  }

  getTimeSeries(project: IArgoProject, date: string): Observable<IArgoTimeSeries> {
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
    })).do(() => this.loaderScreenService.hide());
    //TODO: integrate with message service
    // let warningMessages = [];
    // if (parsedInputChannel.data.length == 0)
    //   warningMessages.push("Input channel contains no samples for date");
    // if (parsedOutputChannel.data.length == 0)
    //   warningMessages.push("Output channel contains no samples for date");
    // if ((parsedInputChannel.data.length != 0) && (parsedOutputChannel.data.length != 0) && (parsedInputChannel.data.length != parsedOutputChannel.data.length))
    //   warningMessages.push("Input and output channels have different number of samples for date");
  }
}
