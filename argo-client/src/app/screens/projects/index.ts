import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { IProject } from '../../model/project';
import { HydraHttpBackendService } from '../../services/hydra-http-backend.service';
import { routeUrls } from '../../route-urls';

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
