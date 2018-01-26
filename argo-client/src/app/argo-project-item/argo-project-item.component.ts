import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IArgoProject } from '../model/argo-project';
import { ArgoProjectsService } from '../services/argo-projects.service';

@Component({
  selector: 'argo-project-item',
  template: `
    <li class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <label>{{project.name}}</label>
        <div class="btn-group btn-group-toggle">
          <button type class="btn btn-sm btn-primary" (click)="editClicked()">Edit</button>
          <button type class="btn btn-sm btn-danger" (click)="deleteClicked()">Delete</button>
        </div>
      </div>
    </li>
  `,
  styleUrls: ['./argo-project-item.component.css']
})
export class ArgoProjectItemComponent implements OnInit {
  @Input() project: IArgoProject;
  @Output() onEditClicked = new EventEmitter<string>();
  @Output() onDeleteClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  editClicked() {
    if (_.isObject(this.onEditClicked))
      this.onEditClicked.emit(this.project.id);
  }

  deleteClicked() {
    if (_.isObject(this.onDeleteClicked))
      this.onDeleteClicked.emit(this.project.id);
  }
}