import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RayonListComponent } from './rayon-list/rayon-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listRayon' },
  { path: 'listRayon', component: RayonListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RayonRoutingModule { }
