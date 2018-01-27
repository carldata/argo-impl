import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArgoProjectItemsComponent } from './argo-project-items/argo-project-items.component';
import { ArgoProjectDetailsComponent } from './argo-project-details/argo-project-details.component';
import { routeUrls } from './route-urls';

const routes: Routes = [
  { path: '', redirectTo: `/${routeUrls.projects}`, pathMatch: 'full' },
  { path: `${routeUrls.projects}`, component: ArgoProjectItemsComponent },
  { path: `${routeUrls.projectDetail}/:id`, component: ArgoProjectDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
