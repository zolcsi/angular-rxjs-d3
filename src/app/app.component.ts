import { Component, ViewChild } from '@angular/core';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MdCard } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(LineChartComponent) lineChartComponent: LineChartComponent;
  nextNumber: number;
  chartData: number[] = [];

  onChartUpdate(nextNumber: number) {
    this.nextNumber = nextNumber;
    this.chartData.push(nextNumber);
  }

  onReset() {
    this.nextNumber = null;
    this.chartData = [];
    this.lineChartComponent.onReset();
  }
}

