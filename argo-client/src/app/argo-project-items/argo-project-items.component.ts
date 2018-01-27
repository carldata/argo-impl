import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { IArgoProject } from '../model/argo-project';
import { ArgoProjectsService } from '../services/argo-projects.service';
import { routeUrls } from '../route-urls';


@Component({
  selector: 'argo-project-items',
  templateUrl: './argo-project-items.component.html',
  styleUrls: ['./argo-project-items.component.css']
})
export class ArgoProjectItemsComponent implements OnInit {
  public projects: IArgoProject[];

  constructor(private router: Router, private argoProjectsService: ArgoProjectsService) { }

  onProjectAddClicked() {
    this.argoProjectsService.add({
      id: v4(),
      name: `random-${_.random(1, 124)}`,
      inputChannelId: `input-channel-${_.random(10, 100)}`,
      outputChannelId: `input-channel-${_.random(10, 100)}`
    }).subscribe((projects) => {
      this.projects = projects;
    });
  }

  onProjectEditClicked(id: string) {
    this.router.navigate([`${routeUrls.projectDetail}/${id}`]);
  }

  onProjectDeleteClicked(id) {
    this.argoProjectsService.delete(id).subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnInit() {
    this.argoProjectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
