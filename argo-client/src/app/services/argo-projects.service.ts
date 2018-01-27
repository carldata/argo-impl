import 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IListItem } from '../model/list-item';
import { IArgoProject } from '../model/argo-project';
import { tap } from 'rxjs/operators';
import { IHttpEndpoint, HTTP_ENDPOINT } from './http-endpoint';

@Injectable()
export class ArgoProjectsService {
  private httpEndpoint: IHttpEndpoint;

  constructor(@Inject(HTTP_ENDPOINT) httpEndpoint: IHttpEndpoint) { 
    this.httpEndpoint = httpEndpoint;
  }
  
  getProjects(): Observable<IArgoProject[]> {
    return this.httpEndpoint.getProjects();
  }

  add(project: IArgoProject): Observable<IArgoProject[]> {
    return this.httpEndpoint.add(project);
  }

  delete(id: string): Observable<IArgoProject[]> {
    return this.httpEndpoint.delete(id);
  }
}
