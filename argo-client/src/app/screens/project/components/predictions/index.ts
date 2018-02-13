import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { IDateTimeValue } from '../../../../model/date-time-value';
import { IProject } from '../../../../model/project';
import { EnumCsvDataSourceType, ICsvDataSource } from '../../../../model/csv-data-source';
import { HydraHttpBackendService } from '../../../../services/backend';

@Component({
  selector: 'predictions',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class PredictionsComponent implements OnInit, OnChanges {
  @Input() project: IProject = <IProject> { csvDataSources: [] };
  public flowChannels: ICsvDataSource[] = [];
  public selectedCsvDataSource: ICsvDataSource = <ICsvDataSource> { name: "No flow channels available !" }
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

  constructor(private backendService: HydraHttpBackendService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.flowChannels = _.filter(this.project.csvDataSources, el => el.type == EnumCsvDataSourceType.Flow);
    if (this.flowChannels.length > 0)
      this.selectedCsvDataSource = _.first(this.flowChannels);
  }

  onDropDownClick(channelName: string) {
    this.selectedCsvDataSource = ((ch) => (ch && _.isString(ch.name) ? ch : this.selectedCsvDataSource) )(_.find(this.project.csvDataSources, el => el.name == channelName));
  }

  onLoadTimeSeries() {
    if (_.isString(this.selectedCsvDataSource.url))
      this.backendService.getTimeSeries(this.selectedCsvDataSource.url, this.selectedDate, 
        el => <IDateTimeValue> {
          unixTimestamp: new Date(el.time).getTime(),
          value: parseFloat(el.flow)
        }
      ).subscribe((results: IDateTimeValue[]) => {
        this.chartData = [{
          values: results,
          key: 'Channel',
          color: 'orange'
        }]
      });
  }
}
