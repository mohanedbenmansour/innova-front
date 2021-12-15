import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { FrontNavbarComponent } from './front-navbar/front-navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReclamationComponent } from './reclamation/reclamation.component';
@NgModule({
  declarations: [
    FrontOfficeComponent,
    FrontNavbarComponent,
    CartComponent,
    ReclamationComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FrontOfficeRoutingModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrontOfficeModule { }
