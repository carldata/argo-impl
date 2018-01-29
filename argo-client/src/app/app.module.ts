import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ArgoProjectItemComponent } from './argo-project-item/argo-project-item.component';
import { ArgoProjectItemsComponent } from './argo-project-items/argo-project-items.component';
import { ArgoProjectsService } from './services/argo-projects.service';
import { IHttpEndpoint, HTTP_ENDPOINT } from './services/http-endpoint';
import { FormsModule } from '@angular/forms';
import { HttpEndpointMockService } from './services/http-endpoint-mock.service';
import { environment } from  '../environments/environment';
import { HttpEndpointService } from './services/http-endpoint.service';
import { AppRoutingModule } from './app-routing.module';
import { ArgoProjectDetailsComponent } from './argo-project-details/argo-project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ArgoProjectItemComponent,
    ArgoProjectItemsComponent,
    ArgoProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ArgoProjectsService, 
    {
      provide: HTTP_ENDPOINT,
      useClass: environment.mockHttp ? HttpEndpointMockService : HttpEndpointService
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
