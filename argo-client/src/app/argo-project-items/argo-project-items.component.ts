import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { IArgoProject } from '../model/argo-project';
import { HydraHttpBackendService } from '../services/hydra-http-backend.service';
import { routeUrls } from '../route-urls';
import { EnumArgoProjectDetailsComponentModes } from '../argo-project-details/argo-project-details.component';

@Component({
  selector: 'argo-project-items',
  templateUrl: './argo-project-items.component.html',
  styleUrls: ['./argo-project-items.component.css']
})
export class ArgoProjectItemsComponent implements OnInit {
  public projects: IArgoProject[];

  constructor(private router: Router, private backendService: HydraHttpBackendService) { }

  onProjectAddClicked() {
    this.router.navigate([`${routeUrls.projectDetail}/${EnumArgoProjectDetailsComponentModes.Add}/${v4()}`]);
  }

  onProjectEditClicked(id: string) {
    this.router.navigate([`${routeUrls.projectDetail}/${EnumArgoProjectDetailsComponentModes.Edit}/${id}`]);
  }

  onProjectDeleteClicked(id) {
    this.backendService.delete(id).subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnInit() {
    this.backendService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
