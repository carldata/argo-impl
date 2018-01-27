import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IArgoProject } from "../model/argo-project";

export interface IHttpEndpoint {
  getProjects(): Observable<IArgoProject[]>;
  delete(id: string): Observable<any>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');