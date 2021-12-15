import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationDashboardComponent } from './reclamation-dashboard.component';

import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AngularMaterialModule} from "../../shared/angular-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ProductListComponent} from "../product/product-list/product-list.component";
import {ListReclamationComponent} from "./list-reclamation/list-reclamation.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listReclamations' },
  {path:'listReclamations',component:ListReclamationComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationDashboardRoutingModule { }
