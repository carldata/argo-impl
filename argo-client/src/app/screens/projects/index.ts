import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { routeUrls } from '../../route-urls';
import { BackendService } from '../../services/backend';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FETCH_PROJECTS_STARTED } from './ng-rx/action-types';
import { IProject } from '@backend-service/model';
import { IAppState } from '@app-state/.';

@Component({
  templateUrl: './index.html'
})
export class ProjectsScreen implements OnInit {
  public projects: IProject[];

  constructor(private router: Router, private store: Store<IAppState>) { 
    store
      .pipe(select((store) => store.projectsScreenState.projects))
      .subscribe((result) => this.projects = result);
  }

  ngOnInit() {
    this.store.dispatch({ type: FETCH_PROJECTS_STARTED });
  }
}
