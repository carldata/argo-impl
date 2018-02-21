import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { IProject } from '@app-state/.';
import { routeUrls } from '../../route-urls';

@Component({
  selector: 'project-thumbnail',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class ProjectThumbnailComponent implements OnInit {
  @Input() project: IProject;
  constructor(private router: Router) { }
  ngOnInit() {
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }
}
