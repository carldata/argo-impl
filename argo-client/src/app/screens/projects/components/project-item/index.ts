import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../../../../route-urls';
import { IProject } from '@backend-service/model';

@Component({
  selector: 'project-item',
  templateUrl: './index.html'
})
export class ProjectItemComponent implements OnInit {
  @Input() project: IProject;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectClicked() {
    this.router.navigate([`${routeUrls.project}/${this.project.id}`]);
  }
}
