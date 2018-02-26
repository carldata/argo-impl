import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Store, select } from '@ngrx/store';
import { IAppState, IProjectScreenState } from '@app-state/.';
import { ComponentWithChart } from '../component-with-chart';
import { EnumCsvDataSourceType, IDateTimeValue } from '@backend-service/model';
import * as actions from './ng-rx/actions';

@Component({
  selector: 'anomalies-tab',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class AnomaliesComponent extends ComponentWithChart implements OnInit {
  public dateFrom: string = dateFns.format(new Date(), environment.dateFormat);
  public dateTo: string = dateFns.format(new Date(), environment.dateFormat);
  
  constructor(private store: Store<IAppState>) {
    super();
  }

  ngOnInit() {
    super.updateChartSize();
    this.store
      .pipe(select((store) => store.projectScreenState ))
      .subscribe((screenState: IProjectScreenState) => {
        if (!_.isObject(screenState.project))
          return;
        this.project = screenState.project;
        this.flowChannels = _.filter(this.project.csvDataSources, el => el.type == EnumCsvDataSourceType.Flow);
        this.dateFrom = screenState.anomaliesTab.dateFrom;
        this.dateTo = screenState.anomaliesTab.dateTo;
        this.selectedCsvDataSource = _.find(this.flowChannels, s => s.name == screenState.anomaliesTab.flowChannel);
        if ((!_.isObject(this.selectedCsvDataSource)) && (this.flowChannels.length > 0))
          this.selectedCsvDataSource = _.first(this.flowChannels);
        this.chartData = [{
          values: screenState.anomaliesTab.flow,
          key: 'Flow',
          color: 'blue'
        },{
          values: screenState.anomaliesTab.anomalies,
          key: 'Anomalies',
          color: 'red'
        }]
      });
  }
  
  onFlowDropDownClick(channelName: string) {
    super.onFlowDropDownClick(channelName);
    if (_.isObject(this.selectedCsvDataSource)) {
      this.store.dispatch(new actions.AnomaliesFlowChannelChangedAction(channelName));
    }
  }

  onDateFromToChanged(dateFrom: string, dateTo: string) {
    this.store.dispatch(new actions.AnomaliesDateFromToChangedAction(dateFrom, dateTo));
  }

  onLoadTimeSeries() {
    if (_.isString(this.selectedCsvDataSource.url)) {
      this.store.dispatch(new actions.AnomaliesFetchDataStartedAction({ 
        projectName: this.project.name,
        timeSeriesUrl: this.selectedCsvDataSource.url,
        anomaliesUrl: environment.anomaliesBackendUrl,
        channelName: this.selectedCsvDataSource.name,
        dateFrom: dateFns.format(new Date(this.dateFrom), environment.dateFormat),
        dateTo: dateFns.format(new Date(this.dateTo), environment.dateFormat),
        flowMap: el => <IDateTimeValue> {
          unixTimestamp: new Date(el.time).getTime(),
          value: parseFloat(el.flow)
        },
        anomaliesMap: el => <IDateTimeValue> {
          unixTimestamp: new Date(el.time).getTime(),
          value: parseFloat(el.value)
        }
      }));
    }
  }
}
