import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeUrls } from './route-urls';
import { ArgoProjectItemsComponent } from './argo-project-items/argo-project-items.component';
import { ArgoProjectDetailsComponent } from './argo-project-details/argo-project-details.component';
import { ArgoProjectTimeSeriesComponent } from './argo-project-time-series/argo-project-time-series.component';

const routes: Routes = [
  { path: '', redirectTo: `/${routeUrls.projects}`, pathMatch: 'full' },
  { path: `${routeUrls.projects}`, component: ArgoProjectItemsComponent },
  { path: `${routeUrls.projectDetail}/:mode/:id`, component: ArgoProjectDetailsComponent },
  { path: `${routeUrls.projectTimeSeries}/:id`, component: ArgoProjectTimeSeriesComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
