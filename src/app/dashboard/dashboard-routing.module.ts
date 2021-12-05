import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent ,
children:[
  {path:'products',loadChildren:() => import('./product/product.module').then(m => m.ProductModule)},
  {path:'stock',loadChildren:() => import('./stock/stock.module').then(m => m.StockModule)},
  {path:'rayon',loadChildren:() => import('./rayon/rayon.module').then(m => m.RayonModule)},

]
}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
