import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, OnChanges, Inject, HostListener } from '@angular/core';
import { IDateTimeValue } from '../../../../model/date-time-value';
import { IProject } from '../../../../model/project';
import { EnumCsvDataSourceType, ICsvDataSource } from '../../../../model/csv-data-source';
import { BackendService } from '../../../../services/backend';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../model/app-state';
import { PREDICTIONS_FETCH_TIME_SERIES_STARTED } from '../../ng-rx/action-types';

@Component({
  selector: 'predictions',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
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

  constructor(private store: Store<IAppState>) { }

  private updateChartSize() {
    this.chartOptions = _.extend({}, this.chartOptions, {
      chart: _.extend({}, this.chartOptions.chart, {
        width: window.innerWidth-50,
        height: window.innerHeight-220
      })
    });
  }

  ngOnInit() {
    this.updateChartSize();
    this.store
      .pipe(select((store) => store.projectScreenState.predictionsTab.selectedDate ))
      .subscribe((date: string) => {
        
        // this.project = project;
        // this.store.dispatch({ 
        //   type: SELECT_PROJECT,
        //   payload: project
        // })
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartSize();
  }

  ngOnChanges() {
    this.flowChannels = _.filter(this.project.csvDataSources, el => el.type == EnumCsvDataSourceType.Flow);
    if (this.flowChannels.length > 0)
      this.selectedCsvDataSource = _.first(this.flowChannels);
  }

  onSelectedDateChanged(x: any) {
    console.log(x);
  }

  onDropDownClick(channelName: string) {
    this.selectedCsvDataSource = ((ch) => (ch && _.isString(ch.name) ? ch : this.selectedCsvDataSource) )(_.find(this.project.csvDataSources, el => el.name == channelName));
  }

  onLoadTimeSeries() {
    if (_.isString(this.selectedCsvDataSource.url)) {
      this.store.dispatch({ type: PREDICTIONS_FETCH_TIME_SERIES_STARTED });
      // const timeSeriesObservable = this.backendService.getTimeSeries(this.selectedCsvDataSource.url, this.selectedDate, 
      //   el => <IDateTimeValue> {
      //     unixTimestamp: new Date(el.time).getTime(),
      //     value: parseFloat(el.flow)
      //   }
      // );
      // const predictionsObservable = this.backendService.getPrediction(this.project.name, this.selectedCsvDataSource.name, new Date(this.selectedDate));
      // Observable.forkJoin(timeSeriesObservable, predictionsObservable).subscribe((results: IDateTimeValue[][]) => {
      //   const [flow, predictions] = results;
      //   this.chartData = [{
      //     values: flow,
      //     key: 'Flow',
      //     color: 'blue'
      //   },{
      //     values: predictions,
      //     key: 'Prediction',
      //     color: 'orange'
      //   }]
      // });
    }
  }
}
