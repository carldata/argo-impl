import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { IProject } from '../../model/project';
import { Router, ActivatedRoute } from '@angular/router';
import { HydraHttpBackendService } from '../../services/hydra-http-backend.service';

@Component({
  templateUrl: './index.html',
})
export class ProjectScreen implements OnInit {
  public project: IProject = <IProject> { id: "" };
  
  constructor(private router: Router, private route: ActivatedRoute, private backendService: HydraHttpBackendService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backendService.getProjects().subscribe((projects) => {
      this.project =  _.find(projects, el => el.id == id);
    });
  }
}