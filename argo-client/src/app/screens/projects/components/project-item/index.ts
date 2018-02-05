import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from '../../../../model/project';
import { routeUrls } from '../../../../route-urls';

@Component({
  selector: 'project-item',
  template: `
    <li class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <label>{{project.name}}</label>
        <div class="btn-group btn-group-toggle">
          <button type class="btn btn-sm btn-success" (click)="selectClicked()">Select</button>
        </div>
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
