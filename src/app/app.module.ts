import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NumberService } from './shared/number.service';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineChartService } from './line-chart/line-chart.service';


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LineChartService,
    NumberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
