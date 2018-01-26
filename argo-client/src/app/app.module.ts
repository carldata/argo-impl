import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ArgoProjectItemComponent } from './argo-project-item/argo-project-item.component';
import { ArgoProjectItemsComponent } from './argo-project-items/argo-project-items.component';
import { ArgoProjectsService } from './services/argo-projects.service';


@NgModule({
  declarations: [
    AppComponent,
    ArgoProjectItemComponent,
    ArgoProjectItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ArgoProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
