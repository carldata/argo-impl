import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { IProject } from '../model/project';
import { Router, ActivatedRoute } from '@angular/router';
import { HydraHttpBackendService } from '../services/hydra-http-backend.service';
import { routeUrls } from '../route-urls';
import { IArgoTimeSeries } from '../model/argo-time-series';
import { IDateTimeValue } from '../model/date-time-point';

@Component({
  selector: 'app-argo-project-time-series',
  templateUrl: './argo-project-time-series.component.html',
  styleUrls: ['./argo-project-time-series.component.css'],
})
export class ArgoProjectTimeSeriesComponent implements OnInit {
  public chartOptions = {
    chart: {
      type: "lineChart",
      width: 800,
      height: 350,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 55
      },
      useInteractiveGuideline: false,
      x: function(d: IDateTimeValue) { return d.unixTimestamp; },
      y: function(d: IDateTimeValue) { return d.value; },
      xAxis: {
        axisLabel: "Time",
        staggerLabels: true,
        tickFormat: (tick) => { return dateFns.format(tick, "MMM-DD HH:mm"); }
      },
      yAxis: {
        axisLabel: "Value",
        axisLabelDistance: -10
      }
    }
  }
  public selectedDate: string = dateFns.format(new Date(), "YYYY-MM-DD");
  public project: IProject = { id: "", name: "", inputChannelId: "", outputChannelId: "" };
  
  public dataInputChannelChart = [];
  public dataOutputChannelChart = [];

  constructor(private router: Router, private route: ActivatedRoute, private backendService: HydraHttpBackendService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backendService.getProjects().subscribe((projects) => {
      this.project =  _.find(projects, el => el.id == id);
    });
  }

  onLoadTimeSeries() {
    this.backendService.getTimeSeries(this.project, this.selectedDate).subscribe((results: IArgoTimeSeries) => {
      this.dataInputChannelChart = [{
        values: results.inputChannelSeries,
        key: 'Input channel',
        color: 'orange'
      }];
      this.dataOutputChannelChart = [{
        values: results.outputChannelSeries,
        key: 'Output channel',
        color: 'red'
      }];
    });
  }

  onGoBack() {
    this.router.navigate([`${routeUrls.projects}`]);
  }
}
