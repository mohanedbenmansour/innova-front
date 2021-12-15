import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'front-office', loadChildren: () => import('./front-office/front-office.module').then(m => m.FrontOfficeModule) },

{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },

{ path: 'dashboard/reclamationDashboard', loadChildren: () => import('./dashboard/reclamation-dashboard/reclamation-dashboard.module').then(m => m.ReclamationDashboardModule) },



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
