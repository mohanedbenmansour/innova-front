import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { FrontNavbarComponent } from './front-navbar/front-navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
@NgModule({
  declarations: [
    FrontOfficeComponent,
    FrontNavbarComponent,
    CartComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FrontOfficeRoutingModule
  ]
})
export class FrontOfficeModule { }
