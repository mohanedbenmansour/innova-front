import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';


@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    UpdateStockComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
