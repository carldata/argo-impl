import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeUrls } from './route-urls';
import { ProjectsScreen } from './screens/projects'
import { ArgoProjectTimeSeriesComponent } from './argo-project-time-series/argo-project-time-series.component';
import { ProjectScreen } from './screens/project/index';

const routes: Routes = [
  { path: '', redirectTo: `/${routeUrls.projects}`, pathMatch: 'full' },
  { path: `${routeUrls.projects}`, component: ProjectsScreen },
  { path: `${routeUrls.project}/:id`, component: ProjectScreen },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
