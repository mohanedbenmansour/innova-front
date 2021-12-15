import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureUpdateComponent } from './facture-update/facture-update.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FactureDetailComponent } from './facture-detail/facture-detail.component';


@NgModule({
  declarations: [
    FactureComponent,
    FactureListComponent,
    FactureUpdateComponent,
    FactureDetailComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    CommonModule,
    FontAwesomeModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    Ng2SearchPipeModule
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

  ]
})
export class FactureModule { }
