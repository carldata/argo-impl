import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Store, select } from '@ngrx/store';
import { IAppState, IProjectScreenState } from '@app-state/.';
import { ComponentWithChart } from '../component-with-chart';
import { EnumCsvDataSourceType, ICsvDataSource, IUnixValue } from '@backend-service/model';
import * as actions from './ng-rx/actions';
import { IUnixTimePoint, EnumTimeSeriesType, IExternalSourceTimeSeries } from 'time-series-scroller';

@Component({
  selector: 'anomalies-tab',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class AnomaliesComponent extends ComponentWithChart implements OnInit {
  public selectedEditedFlowCsvDataSource: ICsvDataSource = <ICsvDataSource> { name: "No flow channels available !" }
  public dateFrom: string = dateFns.format(new Date(), environment.dateFormat);
  public dateTo: string = dateFns.format(new Date(), environment.dateFormat);


  constructor(private store: Store<IAppState>) {
    super("divChartAnomalies", true);
  }

  ngOnInit() {
    this.store
      .pipe(select((store) => store.projectScreenState ))
      .subscribe((screenState: IProjectScreenState) => {
        if (!_.isObject(screenState.project))
          return;
        this.project = screenState.project;
        this.flowChannels = _.filter(this.project.csvDataSources, el => (el.type == EnumCsvDataSourceType.Flow && !_.endsWith(el.name, "_edited")));
        this.selectedBaseFlowCsvDataSource = _.find(this.flowChannels, s => s.name == screenState.anomaliesTab.flowChannel);
        if (!_.isObject(this.selectedBaseFlowCsvDataSource))
          this.selectedBaseFlowCsvDataSource = (this.flowChannels.length > 0) ? _.first(this.flowChannels) : <ICsvDataSource> { name: "No flow channels available !" };
        this.selectedEditedFlowCsvDataSource = _.find(this.project.csvDataSources, s => s.name == `${this.selectedBaseFlowCsvDataSource.name}_edited`);
          if (_.isUndefined(this.selectedEditedFlowCsvDataSource))
          this.selectedEditedFlowCsvDataSource = <ICsvDataSource> { name: "No flow channels available !" };
        this.chartData = [{
            color: "blue",
            name: "Flow",
            points: screenState.anomaliesTab.baseFlow,
            type: EnumTimeSeriesType.Line
          },
          {
            color: "orange",
            name: "Edited Flow",
            points: screenState.anomaliesTab.editedFlow,
            type: EnumTimeSeriesType.Line
          }, ... _.map(screenState.anomaliesTab.normalizedAnomalies, el => <IExternalSourceTimeSeries>{
            color: "red",
            name: "Anomalies",
            points: el,
            type: EnumTimeSeriesType.DottedLine
          })];
        this.refreshChart();
      });
  }

  onFlowDropDownClick(channelName: string) {
    super.onFlowDropDownClick(channelName);
    if (_.isObject(this.selectedBaseFlowCsvDataSource)) {
      this.store.dispatch(new actions.AnomaliesFlowChannelChangedAction(channelName));
    }
  }

  onLoadTimeSeries() {
    if (_.isString(this.selectedBaseFlowCsvDataSource.url)) {
      this.store.dispatch(new actions.AnomaliesFetchDataStartedAction({ 
        projectName: this.project.name,
        baseFlowTimeSeriesUrl: this.selectedBaseFlowCsvDataSource.url,
        editedFlowTimeSeriesUrl: this.selectedEditedFlowCsvDataSource.url,
        anomaliesUrl: environment.anomaliesBackendUrl,
        channelName: this.selectedBaseFlowCsvDataSource.name,
        dateFrom: dateFns.format(new Date(this.dateFrom), environment.dateFormat),
        dateTo: dateFns.format(new Date(this.dateTo), environment.dateFormat),
        flowMap: el => <IUnixValue> {
          unix: new Date(el.time).getTime(),
          value: parseFloat(el.flow)
        },
        anomaliesMap: el => <IUnixValue> {
          unix: new Date(el.time).getTime(),
          value: parseFloat(el.value)
        }
      }));
    }
  }
}
