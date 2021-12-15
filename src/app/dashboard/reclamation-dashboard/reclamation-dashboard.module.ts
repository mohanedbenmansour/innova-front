
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ReclamationDashboardComponent} from "./reclamation-dashboard.component";
import {ReclamationDashboardRoutingModule} from "./reclamation-dashboard-routing.module";
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';




@NgModule({
  declarations: [

  ReclamationDashboardComponent,
    ListReclamationComponent
  ],
  imports: [ReclamationDashboardRoutingModule,
    CommonModule,
    FontAwesomeModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,

  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },

  ],
})
export class ReclamationDashboardModule { }
