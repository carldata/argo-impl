import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as Papa from 'papaparse';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ParseResult } from 'papaparse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint, ICsvRowObject } from './contract';
import { IProject, IDateTimeValue } from '@backend-service/model';

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

  public getTimeSeries = (url: string, dateFrom: string, dateTo: string, mapRawElement: (el: any) => IDateTimeValue): Observable<IDateTimeValue[]> =>
    this.http
      .get<Object[]>("assets/json/mock-empty-array.json")
      .map<Object[], IDateTimeValue[]>(() => {
        let result = [];
        let referenceDate = new Date(dateFns.startOfDay(dateFrom));
        let referenceValue = _.random(-50, 50);
        const endDate = new Date(dateFns.endOfDay(dateTo));
        while (dateFns.isBefore(referenceDate, endDate)) {
          result.push(<IDateTimeValue> {
            value: referenceValue + 20-_.random(10),
            unix: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          referenceDate = dateFns.addMinutes(referenceDate, 5);
        }
        return result;
      });
  
  public getPrediction = (url: string, projectName: string, channelName: string, date: string,  map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]> =>
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
            unix: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          referenceDate = dateFns.addMinutes(referenceDate, 5);
        }
        return result;
      });

  public getAnomalies = (url: string, projectName: string, channelName: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IDateTimeValue): Observable<IDateTimeValue[]> =>
    this.http
    .get<Object[]>("assets/json/mock-empty-array.json")
    .map<Object[], IDateTimeValue[]>(() => {
      let result = [];
      let referenceDate = new Date(dateFns.startOfDay(dateFrom));
      let referenceValue = _.random(-50, 50);
      const endDate = new Date(dateFns.endOfDay(dateTo));
      while (dateFns.isBefore(referenceDate, endDate)) {
        let suggestedValue = _.random(0, 10) <= 2 ? referenceValue + 20-_.random(10) : null;
        if (_.isNumber(suggestedValue)) {
          result.push(<IDateTimeValue> {
            value: suggestedValue,
            unix: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
        }
        referenceDate = dateFns.addMinutes(referenceDate, 5);
      }
      return result;
    });
}
