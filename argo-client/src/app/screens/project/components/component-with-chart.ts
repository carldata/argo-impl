import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OnInit, HostListener } from '@angular/core';
import { IProject, ICsvDataSource, IDateTimeValue } from "@backend-service/model";
import { environment } from '@environments/environment';
import { HpTimeSeriesScroller, IHpTimeSeriesScrollerProps, convertHpTimeSeriesChartScss, convertHpSliderScss, IHpSliderScss, IHpTimeSeriesChartScss, hpTimeSeriesChartReducers, IExternalSourceTimeSeries } from 'time-series-scroller';
import * as hpSliderScss from 'time-series-scroller/lib/out/sass/hp-slider.scss';
import * as timeSeriesChartScss from 'time-series-scroller/lib/out/sass/hp-time-series-chart.scss';


export abstract class ComponentWithChart implements OnInit {
  public project: IProject = <IProject> { csvDataSources: [] };
  public flowChannels: ICsvDataSource[] = [];
  public selectedCsvDataSource: ICsvDataSource = <ICsvDataSource> { name: "No flow channels available !" }
  protected chartDimensions = { width: 0, height: 0 };
  protected chartData: IExternalSourceTimeSeries[];

  protected renderChart() {
    ReactDOM.render(
      React.createElement(HpTimeSeriesScroller, <IHpTimeSeriesScrollerProps> {
        timeSeriesChartScss: _.extend(convertHpTimeSeriesChartScss(timeSeriesChartScss), <IHpTimeSeriesChartScss> {
          widthPx: this.chartDimensions.width
        }),
        sliderScss: _.extend(convertHpSliderScss(hpSliderScss), <IHpSliderScss> {
          widthPx: this.chartDimensions.width
        }),
        displayZoomLevelButtons: false,
        state: hpTimeSeriesChartReducers.setData(null, {
          type: null,
          payload: this.chartData
        })
      }),
      document.getElementById("divChart"));
  }

  protected refreshChart() {
    this.chartDimensions.width = window.innerWidth-50;
    this.chartDimensions.height = window.innerHeight-220;
    this.renderChart();
  }

  public ngOnInit() {
    this.refreshChart();
  }
  
  @HostListener('window:resize')
  public onResize() {
    this.refreshChart();
  }

  public onFlowDropDownClick(channelName: string) {
    this.selectedCsvDataSource = ((ch) => (ch && _.isString(ch.name) ? ch : this.selectedCsvDataSource) )(_.find(this.project.csvDataSources, el => el.name == channelName));
  }
}