import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { FactureUpdateComponent } from './facture-update/facture-update.component';
import { FactureListComponent } from './facture-list/facture-list.component';


@NgModule({
  declarations: [
    FactureComponent,
    FactureUpdateComponent,
    FactureListComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule
  ]
})
export class FactureModule { }
