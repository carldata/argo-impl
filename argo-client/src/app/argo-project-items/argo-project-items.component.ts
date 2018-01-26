import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IArgoProject } from '../model/argo-project';
import { ArgoProjectsService } from '../services/argo-projects.service';

@Component({
  selector: 'argo-project-items',
  templateUrl: './argo-project-items.component.html',
  styleUrls: ['./argo-project-items.component.css']
})
export class ArgoProjectItemsComponent implements OnInit {
  public projects: IArgoProject[];

  constructor(public argoProjectsService: ArgoProjectsService) { }

  onProjectEditClicked(id: string) {
  }

  onProjectDeleteClicked(id) {
    this.argoProjectsService.delete(id).subscribe(() => {
      this.projects = _.filter(this.projects, el => el.id != id);
    });
  }

  ngOnInit() {
    this.argoProjectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
