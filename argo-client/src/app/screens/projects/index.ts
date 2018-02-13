import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { IProject } from '../../model/project';
import { routeUrls } from '../../route-urls';
import { HydraHttpBackendService } from '../../services/backend';

@Component({
  templateUrl: './index.html'
})
export class ProjectsScreen implements OnInit {
  public projects: IProject[];

  constructor(private router: Router, private backendService: HydraHttpBackendService) { }

  ngOnInit() {
    this.backendService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
