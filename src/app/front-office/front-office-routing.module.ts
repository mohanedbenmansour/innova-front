import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';

const routes: Routes = [{
  path: '', component: FrontOfficeComponent,
  children: [
    { path: 'facture', loadChildren: () => import('./facture/facture.module').then(m => m.FactureModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
