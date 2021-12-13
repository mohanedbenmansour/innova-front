import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "../product/product-list/product-list.component";
import {FactureListComponent} from "./facture-list/facture-list.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listFactures' },
  {path:'listFactures',component:FactureListComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
