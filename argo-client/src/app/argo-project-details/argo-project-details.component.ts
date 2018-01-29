import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../route-urls';
import { ActivatedRoute } from '@angular/router';
import { ArgoProjectsService } from '../services/argo-projects.service';
import { IArgoProject } from '../model/argo-project';

export const enum EnumArgoProjectDetailsComponentModes {
  Add,
  Edit
}

@Component({
  selector: 'app-argo-project-details',
  templateUrl: './argo-project-details.component.html',
  styleUrls: ['./argo-project-details.component.css']
})
export class ArgoProjectDetailsComponent implements OnInit {
  private mode: EnumArgoProjectDetailsComponentModes;
  public project: IArgoProject = { id: "", name: "", inputChannelId: "", outputChannelId: "" };
  
  constructor(private router: Router, private route: ActivatedRoute, private projectsService: ArgoProjectsService) {
  }

  ngOnInit() {
    this.mode = +this.route.snapshot.paramMap.get('mode') 
    this.project.id = this.route.snapshot.paramMap.get('id');
    if (this.mode == EnumArgoProjectDetailsComponentModes.Edit) {
      this.projectsService.getProjects().subscribe((projects) => {
        this.project =  _.find(projects, el => el.id == this.project.id);
      });
    }
  }

  onApprove() {
    switch (this.mode) {
      case EnumArgoProjectDetailsComponentModes.Add:
        this.projectsService.add(this.project).subscribe(() => {
          this.router.navigate([`${routeUrls.projects}`]);
        });
        break;
      case EnumArgoProjectDetailsComponentModes.Edit:
        this.projectsService.update(this.project).subscribe(() => {
          this.router.navigate([`${routeUrls.projects}`]);
        });
        break;
    }
    
  }

  onCancel() {
    this.router.navigate([`${routeUrls.projects}`]);
  }
}
