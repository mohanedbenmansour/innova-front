import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from './shared/angular-material.module';
import { ToastrModule } from 'ngx-toastr';
import { ProductChartComponent } from './dasboard/product/product-chart/product-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductChartComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),

    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
