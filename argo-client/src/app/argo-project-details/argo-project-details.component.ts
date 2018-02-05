import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../route-urls';
import { ActivatedRoute } from '@angular/router';
import { HydraHttpBackendService } from '../services/hydra-http-backend.service';
import { IProject } from '../model/project';

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
  public project: IProject = { id: "", name: "", inputChannelId: "", outputChannelId: "" };
  
  constructor(private router: Router, private route: ActivatedRoute, private backendService: HydraHttpBackendService) {
  }

  ngOnInit() {
    this.mode = +this.route.snapshot.paramMap.get('mode') 
    this.project.id = this.route.snapshot.paramMap.get('id');
    if (this.mode == EnumArgoProjectDetailsComponentModes.Edit) {
      this.backendService.getProjects().subscribe((projects) => {
        this.project =  _.find(projects, el => el.id == this.project.id);
      });
    }
  }

  onApprove() {
    switch (this.mode) {
      case EnumArgoProjectDetailsComponentModes.Add:
        this.backendService.add(this.project).subscribe(() => {
          this.router.navigate([`${routeUrls.projects}`]);
        });
        break;
      case EnumArgoProjectDetailsComponentModes.Edit:
        this.backendService.update(this.project).subscribe(() => {
          this.router.navigate([`${routeUrls.projects}`]);
        });
        break;
    }
  }

  onCancel() {
    this.router.navigate([`${routeUrls.projects}`]);
  }
}
