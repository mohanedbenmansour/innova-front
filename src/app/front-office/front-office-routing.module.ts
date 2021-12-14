import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';

const routes: Routes = [{ path: '', component: FrontOfficeComponent,
children: [
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
