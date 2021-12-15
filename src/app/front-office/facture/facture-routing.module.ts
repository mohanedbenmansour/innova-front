import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureComponent } from './facture.component';
import {FactureListComponent} from "../../dashboard/facture/facture-list/facture-list.component";

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'listFactures' },
  {path:'listFactures',component:FactureListComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
