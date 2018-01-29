import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../route-urls';
import { ActivatedRoute } from '@angular/router';
import { ArgoProjectsService } from '../services/argo-projects.service';
import { IArgoProject } from '../model/argo-project';

@Component({
  selector: 'app-argo-project-details',
  templateUrl: './argo-project-details.component.html',
  styleUrls: ['./argo-project-details.component.css']
})
export class ArgoProjectDetailsComponent implements OnInit {
  public project: IArgoProject = { id: "", name: "", inputChannelId: "", outputChannelId: "" };

  constructor(private router: Router, private route: ActivatedRoute, private projectsService: ArgoProjectsService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectsService.getProjects().subscribe((projects) => {
      this.project =  _.find(projects, el => el.id == id);
    });
  }

  onApprove() {
    this.projectsService.update(this.project).subscribe(() => {
      this.router.navigate([`${routeUrls.projects}`]);
    });
  }

  onCancel() {
    this.router.navigate([`${routeUrls.projects}`]);
  }
}
