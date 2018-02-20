import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as Papa from 'papaparse';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ParseResult } from 'papaparse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../../../model/project';
import { IListItem } from '../../../model/list-item';
import { IDateTimeValue } from '../../../model/date-time-value';
import { IHttpEndpoint } from './contract';

@Injectable()
export class HttpEndpointMockService implements IHttpEndpoint {
  constructor(private http: HttpClient) { }

  public getProjects = (): Observable<IProject[]> => 
    this.http
      .get<Object[]>("assets/json/mock-projects.json")
      .map<Object[], IProject[]>((elements: Object[]) => 
        _.reduce(elements, (items: IProject[], element: Object) =>  
          _.concat(items, [
            _.extend(element, <IProject> {
              startDate: dateFns.parse(element["startDate"]),
              endDate: dateFns.parse(element["endDate"]),
              splitDate: dateFns.parse(element["splitDate"])
          })]
        )));

  public getTimeSeries = (url: string, date: string, mapRawElement: (el: any) => IDateTimeValue): Observable<IDateTimeValue[]> =>
    this.http
      .get<Object[]>("assets/json/mock-empty-array.json")
      .map<Object[], IDateTimeValue[]>(() => {
        let result = [];
        let referenceDate = new Date(dateFns.startOfDay(date));
        let referenceValue = _.random(-50, 50);
        const endDate = new Date(dateFns.startOfDay(dateFns.addDays(date, 1)));
        while (dateFns.isBefore(referenceDate, endDate)) {
          result.push(<IDateTimeValue> {
            value: referenceValue + 20-_.random(10),
            unixTimestamp: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          referenceDate = dateFns.addMinutes(referenceDate, 5);
        }
        return result;
      });
  
  public getPrediction = (projectName: string, channelName: string, date: string): Observable<IDateTimeValue[]> =>
    this.http
      .get<Object[]>("assets/json/mock-empty-array.json")
      .map<Object[], IDateTimeValue[]>(() => {
        let result = [];
        let referenceDate = new Date(dateFns.startOfDay(date));
        let referenceValue = _.random(-50, 50);
        const endDate = new Date(dateFns.startOfDay(dateFns.addDays(date, 1)));
        while (dateFns.isBefore(referenceDate, endDate)) {
          result.push(<IDateTimeValue> {
            value: referenceValue + 20-_.random(10),
            unixTimestamp: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          referenceDate = dateFns.addMinutes(referenceDate, 5);
        }
        return result;
      });
  
}
