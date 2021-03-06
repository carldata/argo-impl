import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as chartStyles from '../../../../../sass/charting.scss';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Input, Inject, HostListener, AfterViewInit, AfterViewChecked, SimpleChanges, OnChanges, AfterContentChecked, AfterContentInit } from '@angular/core';
import * as actions from './ng-rx/actions';
import { IPredictionsTabFetchDataStartedPayload } from './ng-rx/payloads';
import { IProject, ICsvDataSource, IUnixValue, EnumCsvDataSourceType } from '@backend-service/model';
import { IAppState, IProjectScreenState } from '@app-state/.';
import { environment } from '@environments/environment';
import { ComponentWithChart } from '../component-with-chart';
import { EnumTimeSeriesType } from 'time-series-scroller';

@Component({
  selector: 'predictions-tab',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class PredictionsComponent extends ComponentWithChart implements OnInit {
  public date: string = dateFns.format(new Date(), environment.dateFormat);
  
  constructor(private store: Store<IAppState>) {
    super("divChartPredictions", false);
  }

  ngOnInit() {
    this.store
      .pipe(select((store) => store.projectScreenState ))
      .subscribe((screenState: IProjectScreenState) => {
        if (!_.isObject(screenState.project))
          return;
        this.project = screenState.project;
        this.flowChannels = _.filter(this.project.csvDataSources, el => el.type == EnumCsvDataSourceType.Flow);
        this.date = screenState.predictionsTab.date;
        this.selectedBaseFlowCsvDataSource = _.find(this.flowChannels, s => s.name == screenState.predictionsTab.flowChannel);
        if ((!_.isObject(this.selectedBaseFlowCsvDataSource)) && (this.flowChannels.length > 0))
          this.selectedBaseFlowCsvDataSource = _.first(this.flowChannels);
        this.chartData = [{
          points: screenState.predictionsTab.flow,
          name: 'Base Flow',
          color: chartStyles.baseFlowSeriesColor,
          type: EnumTimeSeriesType.Line
        },{
          points: screenState.predictionsTab.predictions,
          name: 'Prediction',
          color: chartStyles.predictedFlowSeriesColor,
          type: EnumTimeSeriesType.Line
        }];
        this.refreshChart();
      });
  }

  onDateChanged(date: string) {
    this.store.dispatch(new actions.PredictionsDateChangedAction(date));
  }

  onFlowDropDownClick(channelName: string) {
    super.onFlowDropDownClick(channelName);
    if (_.isObject(this.selectedBaseFlowCsvDataSource)) {
      this.store.dispatch(new actions.PredictionsFlowChannelChangedAction(channelName));
    }
  }

  onLoadTimeSeries() {
    if (_.isString(this.selectedBaseFlowCsvDataSource.url)) {
      this.store.dispatch(new actions.PredictionsFetchDataStartedAction({ 
        projectName: this.project.name,
        timeSeriesUrl: this.selectedBaseFlowCsvDataSource.url,
        predictionsUrl: environment.predictionsBackendUrl,
        channelName: this.selectedBaseFlowCsvDataSource.name,
        date: dateFns.format(new Date(this.date), environment.dateFormat),
        flowMap: el => <IUnixValue> {
          unix: new Date(el.time).getTime(),
          value: parseFloat(el.flow)
        },
        predictionsMap: el => <IUnixValue> {
          unix: new Date(el.time).getTime(),
          value: parseFloat(el.value)
        }
      }));
    }
  }
}
