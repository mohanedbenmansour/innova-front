import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import { ProfileComponent } from './profile/profile.component';
import {ReclamationComponent} from "./reclamation/reclamation.component";

const routes: Routes = [{
  path: '', component: FrontOfficeComponent,
  children: [
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
    { path: 'editProfil', component: ProfileComponent },
    { path: 'reclamation', component: ReclamationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
