import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeUrls } from './route-urls';
import { ProjectsScreen } from './screens/projects'
import { ProjectScreen } from './screens/project/index';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [
  { path: '', redirectTo: `/${routeUrls.projects}`, pathMatch: 'full' },
  { path: `${routeUrls.projects}`, component: ProjectsScreen },
  { path: `${routeUrls.project}/:id`, component: ProjectScreen },
  { path: "counter", component: CounterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
