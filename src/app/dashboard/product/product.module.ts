import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ProductChartComponent } from './product-chart/product-chart.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    UpdateProductComponent,
    ProductChartComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
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
export class ProductModule { }
