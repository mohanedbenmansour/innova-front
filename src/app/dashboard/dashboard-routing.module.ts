import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  
  children: [
    { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: 'rayons', loadChildren: () => import('./rayon/rayon.module').then(m => m.RayonModule) },
    { path: 'clients', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
    { path: 'factures', loadChildren: () => import('./facture/facture.module').then(m => m.FactureModule) },
    { path: 'stocks', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) }
  ]
}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
