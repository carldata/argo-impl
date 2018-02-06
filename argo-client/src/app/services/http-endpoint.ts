import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IProject } from "../model/project";
import { IDateTimeValue } from '../model/date-time-value';

export interface IHttpEndpoint {
  getProjects(): Observable<IProject[]>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');