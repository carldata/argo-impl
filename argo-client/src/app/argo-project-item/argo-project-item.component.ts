import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IArgoProject } from '../model/argo-project';
import { HydraHttpBackendService } from '../services/hydra-http-backend.service';
import { Router } from '@angular/router';
import { routeUrls } from '../route-urls';

@Component({
  selector: 'argo-project-item',
  template: `
    <li class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <label>{{project.name}}</label>
        <div class="btn-group btn-group-toggle">
          <button type class="btn btn-sm btn-success" (click)="selectClicked()">Select</button>
        </div>
      </div>
    </li>
  `,
  styleUrls: ['./argo-project-item.component.css']
})
export class ArgoProjectItemComponent implements OnInit {
  @Input() project: IArgoProject;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectClicked() {
    this.router.navigate([`${routeUrls.projectTimeSeries}/${this.project.id}`]);
  }
}
