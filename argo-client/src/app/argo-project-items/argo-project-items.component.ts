import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { IArgoProject } from '../model/argo-project';
import { ArgoProjectsService } from '../services/argo-projects.service';
import { routeUrls } from '../route-urls';
import { EnumArgoProjectDetailsComponentModes } from '../argo-project-details/argo-project-details.component';

@Component({
  selector: 'argo-project-items',
  templateUrl: './argo-project-items.component.html',
  styleUrls: ['./argo-project-items.component.css']
})
export class ArgoProjectItemsComponent implements OnInit {
  public projects: IArgoProject[];

  constructor(private router: Router, private argoProjectsService: ArgoProjectsService) { }

  onProjectAddClicked() {
    this.router.navigate([`${routeUrls.projectDetail}/${EnumArgoProjectDetailsComponentModes.Add}/${v4()}`]);
  }

  onProjectEditClicked(id: string) {
    this.router.navigate([`${routeUrls.projectDetail}/${EnumArgoProjectDetailsComponentModes.Edit}/${id}`]);
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
