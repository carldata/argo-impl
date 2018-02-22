import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import * as actionTypes from '../../ng-rx/action-types';
import * as actions from '../../ng-rx/actions';
import { IPredictionsTabFetchDataStartedPayload } from '../../ng-rx/payloads';
import { IProject, ICsvDataSource, IDateTimeValue, EnumCsvDataSourceType } from '@backend-service/model';
import { IAppState, IProjectScreenState, IPredictionsTab } from '@app-state/.';
import { environment } from '@environments/environment';

@Component({
  selector: 'predictions',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PredictionsComponent implements OnInit {
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
    this.flowChannels = _.filter(this.project.csvDataSources, el => el.type == EnumCsvDataSourceType.Flow);
    this.store
      .pipe(select((store) => store.projectScreenState.predictionsTab ))
      .subscribe((tabState: IPredictionsTab) => {
        this.selectedDate = tabState.selectedDate;
        this.selectedCsvDataSource = _.find(this.flowChannels, s => s.name == tabState.selectedFlowChannel);
        if ((!_.isObject(this.selectedCsvDataSource)) && (this.flowChannels.length > 0))
          this.selectedCsvDataSource = _.first(this.flowChannels);
        this.chartData = [{
          values: tabState.flow,
          key: 'Flow',
          color: 'blue'
        },{
          values: tabState.predictions,
          key: 'Prediction',
          color: 'orange'
        }]
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartSize();
  }

  onSelectedDateChanged(date: string) {
    this.store.dispatch(new actions.PredictionsDateChangedAction(date));
  }

  onDropDownClick(channelName: string) {
    this.selectedCsvDataSource = ((ch) => (ch && _.isString(ch.name) ? ch : this.selectedCsvDataSource) )(_.find(this.project.csvDataSources, el => el.name == channelName));
    if (_.isObject(this.selectedCsvDataSource)) {
      this.store.dispatch(new actions.PredictionsFlowChannelChangedAction(channelName));
    }
  }

  onLoadTimeSeries() {
    if (_.isString(this.selectedCsvDataSource.url)) {
      this.store.dispatch(new actions.PredictionsFetchDataStartedAction({ 
        projectName: this.project.name,
        timeSeriesUrl: this.selectedCsvDataSource.url,
        predictionsUrl: environment.predictionsBackendUrl,
        channelName: this.selectedCsvDataSource.name,
        date: dateFns.format(new Date(this.selectedDate), environment.dateFormat),
        flowMap: el => <IDateTimeValue> {
          unixTimestamp: new Date(el.time).getTime(),
          value: parseFloat(el.flow)
        },
        predictionsMap: el => <IDateTimeValue> {
          unixTimestamp: new Date(el.time).getTime(),
          value: parseFloat(el.value)
        }
      }));
    }
  }
}
