import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { IProject } from '../../../../model/project';
import { routeUrls } from '../../../../route-urls';

@Component({
  selector: 'project-item',
  template: `
    <li class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5>{{ project.name }}</h5>
        <div class="btn-group btn-group-toggle">
          <button type class="btn btn-sm btn-success" (click)="selectClicked()">Select</button>
        </div>
      </div>
      <div class="d-flex w-100">
        <small>Start date: {{ project.startDate | format }}</small>&nbsp;
        <small>End date: {{ project.endDate | format }}</small>&nbsp;
        <small>Split date: {{ project.splitDate | format }}</small>
      </div>
      <div class="d-flex w-100">
        <small>Flows: {{ project.flows | format }}</small>&nbsp;
        <small>Rainfalls: {{ project.rainfalls | format }}</small>&nbsp;
      </div>
    </li>
  `
})
export class ProjectItemComponent implements OnInit {
  @Input() project: IProject;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectClicked() {
    this.router.navigate([`${routeUrls.projectTimeSeries}/${this.project.id}`]);
  }
}
