import 'd3';
import 'nvd3';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NvD3Module } from 'ng2-nvd3';
import { StoreModule } from '@ngrx/store';
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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { counterReducer } from './reducers/counter';

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
    PageNotFoundComponent
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
    StoreModule.forRoot({ count: counterReducer })
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
