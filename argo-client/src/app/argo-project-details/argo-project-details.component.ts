import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../route-urls';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-argo-project-details',
  templateUrl: './argo-project-details.component.html',
  styleUrls: ['./argo-project-details.component.css']
})
export class ArgoProjectDetailsComponent implements OnInit {
  public id: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.router.navigate([`${routeUrls.projects}`]);
  }
}
