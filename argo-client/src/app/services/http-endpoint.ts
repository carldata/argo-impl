import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IArgoProject } from "../model/argo-project";

export interface IHttpEndpoint {
  getProjects(): Observable<IArgoProject[]>;
  add(project: IArgoProject): Observable<IArgoProject[]>;
  delete(id: string): Observable<IArgoProject[]>;
}

export const HTTP_ENDPOINT = new InjectionToken<IHttpEndpoint>('Http endpoint for argo projects');