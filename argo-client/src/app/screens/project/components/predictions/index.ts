import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IDateTimeValue } from '../../../../model/date-time-value';
import { IProject } from '../../../../model/project';
import { EnumCsvDataSourceType, ICsvDataSource } from '../../../../model/csv-data-source';

@Component({
  selector: 'predictions',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class PredictionsComponent implements OnInit, OnChanges {
  @Input() project: IProject = <IProject> { csvDataSources: [] };
  public flowChannels: ICsvDataSource[] = [];
  public selectedFlowChannel: string = "No flow channels available !"
  public selectedDate: string = dateFns.format(new Date(), "YYYY-MM-DD");
  public chartData = [];
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

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.flowChannels = _.filter(this.project.csvDataSources, el => el.type != EnumCsvDataSourceType.NotClassified);
    if (this.flowChannels.length > 0)
      this.selectedFlowChannel = _.first(this.flowChannels).name;
  }

  onDropDownClick(channelName: string) {
    this.selectedFlowChannel = ((ch) => (ch && _.isString(ch.name) ? ch.name : this.selectedFlowChannel) )(_.find(this.project.csvDataSources, el => el.name == channelName));
  }

  onLoadTimeSeries() {
    // this.backendService.getTimeSeries(this.project, this.selectedDate).subscribe((results: IArgoTimeSeries) => {
    //   this.dataInputChannelChart = [{
    //     values: results.inputChannelSeries,
    //     key: 'Input channel',
    //     color: 'orange'
    //   }];
    //   this.dataOutputChannelChart = [{
    //     values: results.outputChannelSeries,
    //     key: 'Output channel',
    //     color: 'red'
    //   }];
    // });
  }
}
