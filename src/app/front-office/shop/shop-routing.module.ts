import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {path:'products',component:ListProductsComponent},
  
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
