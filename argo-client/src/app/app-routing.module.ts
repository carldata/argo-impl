import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeUrls } from './route-urls';
import { ProjectsScreen } from './screens/projects'
import { ProjectScreen } from './screens/project/index';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: `/${routeUrls.projects}`, pathMatch: 'full' },
  { path: `${routeUrls.projects}`, component: ProjectsScreen },
  { path: `${routeUrls.project}/:id`, component: ProjectScreen },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
