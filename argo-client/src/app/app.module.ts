import 'd3';
import 'nvd3';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NvD3Module } from 'ng2-nvd3';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { AppComponent } from './app.component';
import { ProjectsScreen } from './screens/projects';
import { ProjectItemComponent } from './screens/projects/components/project-item'
import { BackendService } from './services/backend';
import { HTTP_ENDPOINT } from './services/backend/variants/contract';
import { HttpEndpointMockService } from './services/backend/variants/mock.service';
import { HttpEndpointService } from './services/backend/variants/concrete.service';
import { FormsModule } from '@angular/forms';
import { environment } from  '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LoaderScreenComponent } from './loader-screen/loader-screen.component';
import { LoaderScreenService } from './loader-screen/loader-screen.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications/notifications.service';
import { FormatPipe } from './pipes/format';
import { ProjectThumbnailComponent } from './components/project-thumbnail';
import { ProjectScreen } from './screens/project';
import { PredictionsComponent } from './screens/project/components/predictions';
import { AnomaliesComponent } from './screens/project/components/anomalies/';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { projectsScreenReducer } from './screens/projects/ng-rx/reducer';
import { EffectsModule } from '@ngrx/effects';
import { IAppState } from '@app-state/.';
import { ProjectsScreenEffects } from './screens/projects/ng-rx/effects';
import { ProjectScreenPredictionsTabEffects } from './screens/project/components/predictions/ng-rx/effects';
import { ProjectScreenAnomaliesTabEffects } from './screens/project/components/anomalies/ng-rx/effects';
import { projectScreenReducer } from './screens/project/ng-rx/reducer';

@NgModule({
  declarations: [
    AppComponent,
    ProjectItemComponent,
    ProjectsScreen,
    LoaderScreenComponent,
    NotificationsComponent,
    FormatPipe,
    ProjectThumbnailComponent,
    ProjectScreen,
    PredictionsComponent,
    PageNotFoundComponent,
    AnomaliesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NvD3Module,
    NgbModule.forRoot(),
    ToasterModule,
    StoreModule.forRoot({ 
      projectsScreenState: projectsScreenReducer,
      projectScreenState: projectScreenReducer
    }),
    EffectsModule.forRoot([ProjectsScreenEffects, ProjectScreenPredictionsTabEffects, ProjectScreenAnomaliesTabEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [
    ToasterService,
    BackendService, 
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
