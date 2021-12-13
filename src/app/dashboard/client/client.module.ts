import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ClientComponent,
    ClientListComponent,
    UpdateClientComponent
  ],
  imports: [FontAwesomeModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ClientRoutingModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class ClientModule { }
