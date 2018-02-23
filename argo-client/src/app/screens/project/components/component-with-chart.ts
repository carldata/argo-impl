import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { OnInit, HostListener } from '@angular/core';
import { IProject, ICsvDataSource, IDateTimeValue } from "@backend-service/model";
import { environment } from '@environments/environment';

export abstract class ComponentWithChart implements OnInit {
  public project: IProject = <IProject> { csvDataSources: [] };
  public flowChannels: ICsvDataSource[] = [];
  public selectedCsvDataSource: ICsvDataSource = <ICsvDataSource> { name: "No flow channels available !" }
  public chartData = [];
  public chartOptions = {
    chart: {
      type: "lineChart",
      width: 800,
      height: 350,
      margin: {
        top: 20,
        right: 55,
        bottom: 55,
        left: 55
      },
      useInteractiveGuideline: false,
      x: function(d: IDateTimeValue) { return d.unixTimestamp; },
      y: function(d: IDateTimeValue) { return d.value; },
      xAxis: {
        axisLabel: "Time",
        staggerLabels: true,
        tickFormat: (tick) => { return dateFns.format(tick, environment.dateTimeFormat); }
      },
      yAxis: {
        axisLabel: "Value",
        axisLabelDistance: -10,
        tickFormat: (tick) => { return Number(tick).toFixed(2) }
      }
    }
  }

  protected updateChartSize() {
    this.chartOptions = _.extend({}, this.chartOptions, {
      chart: _.extend({}, this.chartOptions.chart, {
        width: window.innerWidth-50,
        height: window.innerHeight-220
      })
    });
  }

  public ngOnInit() {
    this.updateChartSize();
  }
  
  @HostListener('window:resize')
  public onResize() {
    this.updateChartSize();
  }

  public onFlowDropDownClick(channelName: string) {
    this.selectedCsvDataSource = ((ch) => (ch && _.isString(ch.name) ? ch : this.selectedCsvDataSource) )(_.find(this.project.csvDataSources, el => el.name == channelName));
  }
}