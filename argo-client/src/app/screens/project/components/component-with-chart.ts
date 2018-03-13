import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OnInit, HostListener } from '@angular/core';
import { IProject, ICsvDataSource, IUnixValue } from "@backend-service/model";
import { environment } from '@environments/environment';
import { HpTimeSeriesScroller, IHpTimeSeriesScrollerProps, convertHpTimeSeriesChartScss, convertHpSliderScss, IHpSliderScss, IHpTimeSeriesChartScss, hpTimeSeriesChartReducers, IExternalSourceTimeSeries, HpTimeSeriesScrollerWrapper, IHpTimeSeriesScrollerWrapperProps } from 'time-series-scroller';
import * as hpSliderScss from 'time-series-scroller/lib/out/sass/hp-slider.scss';
import * as timeSeriesChartScss from 'time-series-scroller/lib/out/sass/hp-time-series-chart.scss';


export abstract class ComponentWithChart implements OnInit {
  private divChart: string;
  private displaySlider: boolean;
  public project: IProject = <IProject> { csvDataSources: [] };
  public flowChannels: ICsvDataSource[] = [];
  public selectedBaseFlowCsvDataSource: ICsvDataSource = <ICsvDataSource> { name: "No flow channels available !" }
  protected chartDimensions = { width: 0, height: 0 };
  protected chartData: IExternalSourceTimeSeries[];

  constructor(divChart, displaySlider) {
    this.divChart = divChart;
    this.displaySlider = displaySlider;
  }

  private renderChart() {
    if (!_.isObject(document.getElementById(this.divChart)))
      return;
    ReactDOM.render(
      React.createElement(HpTimeSeriesScrollerWrapper, <IHpTimeSeriesScrollerWrapperProps> {
        series: this.chartData,
        displaySlider: this.displaySlider,
        timeSeriesChartScss: _.extend(convertHpTimeSeriesChartScss(timeSeriesChartScss), <IHpTimeSeriesChartScss> {
          widthPx: this.chartDimensions.width
        }),
        sliderScss: _.extend(convertHpSliderScss(hpSliderScss), <IHpSliderScss> {
          widthPx: this.chartDimensions.width
        })
      }),
      document.getElementById(this.divChart));
  }

  protected refreshChart() {
    this.chartDimensions.width = window.innerWidth-50;
    this.chartDimensions.height = window.innerHeight-220;
    this.renderChart();
  }

  public ngOnInit() {
  }
  
  @HostListener('window:resize')
  public onResize() {
    this.refreshChart();
  }

  public onFlowDropDownClick(channelName: string) {
    this.selectedBaseFlowCsvDataSource = ((ch) => (ch && _.isString(ch.name) ? ch : this.selectedBaseFlowCsvDataSource) )(_.find(this.project.csvDataSources, el => el.name == channelName));
  }
}