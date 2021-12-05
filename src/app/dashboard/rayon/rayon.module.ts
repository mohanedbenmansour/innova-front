import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RayonRoutingModule } from './rayon-routing.module';
import { RayonComponent } from './rayon.component';
import { UpdateRayonComponent } from './update-rayon/update-rayon.component';
import { RayonListComponent } from './rayon-list/rayon-list.component';


@NgModule({
  declarations: [
    RayonComponent,
    UpdateRayonComponent,
    RayonListComponent
  ],
  imports: [
    CommonModule,
    RayonRoutingModule
  ]
})
export class RayonModule { }
