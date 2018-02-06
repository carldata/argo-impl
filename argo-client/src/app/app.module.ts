import 'd3';
import 'nvd3';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NvD3Module } from 'ng2-nvd3';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { AppComponent } from './app.component';
import { ProjectsScreen } from './screens/projects';
import { ProjectItemComponent } from './screens/projects/components/project-item'
import { HydraHttpBackendService } from './services/hydra-http-backend.service';
import { IHttpEndpoint, HTTP_ENDPOINT } from './services/http-endpoint';
import { FormsModule } from '@angular/forms';
import { HttpEndpointMockService } from './services/http-endpoint-mock.service';
import { environment } from  '../environments/environment';
import { HttpEndpointService } from './services/http-endpoint.service';
import { AppRoutingModule } from './app-routing.module';
import { ArgoProjectTimeSeriesComponent } from './argo-project-time-series/argo-project-time-series.component';
import { LoaderScreenComponent } from './loader-screen/loader-screen.component';
import { LoaderScreenService } from './loader-screen/loader-screen.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications/notifications.service';
import { FormatPipe } from './pipes/format';

@NgModule({
  declarations: [
    AppComponent,
    ProjectItemComponent,
    ProjectsScreen,
    ArgoProjectTimeSeriesComponent,
    LoaderScreenComponent,
    NotificationsComponent,
    FormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NvD3Module,
    ToasterModule
  ],
  providers: [
    ToasterService,
    HydraHttpBackendService, 
    {
      provide: HTTP_ENDPOINT,
      useClass: environment.mockHttp ? HttpEndpointMockService : HttpEndpointService
    },
    LoaderScreenService,
    NotificationsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
