import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { SELECT_PROJECT } from './ng-rx/action-types';
import { IAppState } from '@app-state/.';
import { IProject } from '@backend-service/model';
import { SelectProjectAction } from './ng-rx/actions';
import { FetchProjectsStartedAction } from '../projects/ng-rx/actions';
import { ArgoImplScreen } from '@common/screen';

@Component({
  templateUrl: './index.html',
})
export class ProjectScreen implements OnInit, ArgoImplScreen {
  public project: IProject = <IProject> { id: "" };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<IAppState>) { }

  public hardLinkRebuildState() {
    this.store
      .pipe(select((store) => store.projectsScreenState.projects))
      .subscribe((projects: IProject[]) => {
        if (projects == null)
          this.store.dispatch(new FetchProjectsStartedAction())
      });
  }

  ngOnInit() {
    this.hardLinkRebuildState();
    const id = this.route.snapshot.paramMap.get('id');
    this.store
      .pipe(select((store) => _.find(store.projectsScreenState.projects, el => el.id == id )))
      .subscribe((project: IProject) => {
        if (_.isObject(project)) {
          this.project = project;
          this.store.dispatch(new SelectProjectAction(project))
        }
      });
  }
}