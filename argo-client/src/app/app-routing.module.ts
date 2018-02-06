import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeUrls } from './route-urls';
import { ProjectsScreen } from './screens/projects'
import { ArgoProjectTimeSeriesComponent } from './argo-project-time-series/argo-project-time-series.component';

const routes: Routes = [
  { path: '', redirectTo: `/${routeUrls.projects}`, pathMatch: 'full' },
  { path: `${routeUrls.projects}`, component: ProjectsScreen },
  { path: `${routeUrls.projectTimeSeries}/:id`, component: ArgoProjectTimeSeriesComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
