import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as Papa from 'papaparse';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ParseResult } from 'papaparse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHttpEndpoint, ICsvRowObject } from './contract';
import { IProject, IUnixValue } from '@backend-service/model';

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

  public getTimeSeries = (url: string, dateFrom: string, dateTo: string, mapRawElement: (el: any) => IUnixValue): Observable<IUnixValue[]> =>
    this.http
      .get<Object[]>("assets/json/mock-empty-array.json")
      .map<Object[], IUnixValue[]>(() => {
        let result = [];
        let referenceDate = new Date(dateFns.startOfDay(dateFrom));
        let referenceValue = _.random(-50, 50);
        const endDate = new Date(dateFns.endOfDay(dateTo));
        while (dateFns.isBefore(referenceDate, endDate)) {
          result.push(<IUnixValue> {
            value: referenceValue + 20-_.random(10),
            unix: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          referenceDate = dateFns.addMinutes(referenceDate, 5);
        }
        return result;
      });
  
  public getPrediction = (url: string, projectName: string, channelName: string, date: string,  map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]> =>
    this.http
      .get<Object[]>("assets/json/mock-empty-array.json")
      .map<Object[], IUnixValue[]>(() => {
        let result = [];
        let referenceDate = new Date(dateFns.startOfDay(date));
        let referenceValue = _.random(-50, 50);
        const endDate = new Date(dateFns.startOfDay(dateFns.addDays(date, 1)));
        while (dateFns.isBefore(referenceDate, endDate)) {
          result.push(<IUnixValue> {
            value: referenceValue + 20-_.random(10),
            unix: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          referenceDate = dateFns.addMinutes(referenceDate, 5);
        }
        return result;
      });

  public getAnomalies = (url: string, projectName: string, channelName: string, dateFrom: string, dateTo: string, map: (el: ICsvRowObject) => IUnixValue): Observable<IUnixValue[]> =>
    this.http
    .get<Object[]>("assets/json/mock-empty-array.json")
    .map<Object[], IUnixValue[]>(() => {
      let result = [];
      let referenceDate = new Date(dateFns.startOfDay(dateFrom));
      let referenceValue = _.random(-50, 50);
      const endDate = new Date(dateFns.endOfDay(dateTo));
      let sampleCounter = (3 < _.random(0, 10)) ? _.random(5, 10) : 0;
      while (dateFns.isBefore(referenceDate, endDate)) {
        let suggestedValue = referenceValue + 20-_.random(10);
        if (sampleCounter > 0) {
          result.push(<IUnixValue> {
            value: suggestedValue,
            unix: referenceDate.getTime()
          });
          referenceValue = referenceValue + 10-_.random(20);
          sampleCounter = sampleCounter-1;
        } else {
          sampleCounter = (3 < _.random(0, 10)) ? _.random(5, 10) : 0;
        }
        referenceDate = dateFns.addMinutes(referenceDate, 5);
      }
      return result;
    });
}
