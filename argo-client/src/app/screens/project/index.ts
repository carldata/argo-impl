import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { IProject } from '../../model/project';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../model/app-state';
import { SELECT_PROJECT } from './ng-rx/action-types';

@Component({
  templateUrl: './index.html',
})
export class ProjectScreen implements OnInit {
  public project: IProject = <IProject> { id: "" };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<IAppState>) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store
      .pipe(select((store) => _.find(store.projectsScreenState.projects, el => el.id == id )))
      .subscribe((project: IProject) => {
        this.project = project;
        this.store.dispatch({ 
          type: SELECT_PROJECT,
          payload: project
        })
      });
  }
}