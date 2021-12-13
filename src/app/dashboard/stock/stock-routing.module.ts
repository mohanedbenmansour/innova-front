import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'liststock' },
{path:'liststock',component:StockListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
