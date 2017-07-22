import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from '../shared/custom-d3';
import { NumberService } from '../shared/number.service';
import { LineChartService } from './line-chart.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LineChartComponent implements OnInit {

  private static NUMBER_OF_ELEMENTS = 50;
  private static TRANSITION_DURATION = 250;
  private static MAX_Y_VALUE = 10;
  private static NUMBER_OF_TICKS = 5;

  private containerDimensions = {width: 600, height: 400};
  private margin = {top: 30, right: 20, bottom: 30, left: 50};
  private canvasDimensions = {
    width: this.containerDimensions.width - this.margin.left - this.margin.right,
    height: this.containerDimensions.height - this.margin.top - this.margin.bottom
  };
  private data: number[] = [];

  constructor(private lineChartService: LineChartService,
              private numberService: NumberService) {
  }

  ngOnInit() {

    const svg = this.createSvg(this.containerDimensions.width, this.containerDimensions.height);
    const canvas = this.createCanvas(svg, this.margin.left, this.margin.top);

    this.addAxisX(canvas, this.canvasDimensions.height);
    this.addAxisY(canvas);
    this.addLine(canvas, this.data);

    this.numberService.randomNumberGenerator()
      .take(LineChartComponent.NUMBER_OF_ELEMENTS)
      .subscribe((num) => {
        console.log('next: ', num);
        this.data.push(num);
        this.updateAxisX(canvas);
        this.updateAxisY(canvas);
        this.updateLine(canvas, this.data);
      });
  }


  private createSvg(width: number, height: number) {
    return d3.select('#my-chart-container')
      .append('svg')
      .property('id', 'my-chart')
      .attr('width', width)
      .attr('height', height);
  }

  private createCanvas(svg, margingLeft, marginTop) {
    return svg
      .append('g')
      .property('id', 'my-canvas')
      .attr('transform', 'translate(' + margingLeft + ',' + marginTop + ')');
  }


  private addAxisX(canvas, height) {
    canvas
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(this.lineChartService.createAxisXFunction(this.canvasDimensions.width,
        LineChartComponent.NUMBER_OF_TICKS, this.data.length));
  }

  private updateAxisX(canvas) {
    canvas
      .select('.x-axis')
      .transition()
      .duration(LineChartComponent.TRANSITION_DURATION)
      .call(this.lineChartService.createAxisXFunction(this.canvasDimensions.width,
        LineChartComponent.NUMBER_OF_TICKS, this.data.length));
  }


  private addAxisY(canvas) {
    canvas
      .append('g')
      .attr('class', 'y-axis axis')
      .call(this.lineChartService.createAxisYFunction(this.canvasDimensions.height,
        LineChartComponent.NUMBER_OF_TICKS, LineChartComponent.MAX_Y_VALUE));
  }

  private updateAxisY(canvas) {
    canvas
      .select('.y-axis')
      .transition()
      .duration(LineChartComponent.TRANSITION_DURATION)
      .call(this.lineChartService.createAxisYFunction(this.canvasDimensions.height,
        LineChartComponent.NUMBER_OF_TICKS, LineChartComponent.MAX_Y_VALUE));
  }


  private addLine(canvas, data) {
    canvas
      .append('path')
      .datum(data)
      .attr('class', 'chart-line')
      .attr('d', this.lineChartService.createLineFunction(this.canvasDimensions.width,
        this.canvasDimensions.height, data, LineChartComponent.MAX_Y_VALUE));
  }

  private updateLine(canvas, data) {
    canvas
      .select('.chart-line')
      .transition()
      .duration(LineChartComponent.TRANSITION_DURATION)
      .attr('d', this.lineChartService.createLineFunction(this.canvasDimensions.width,
        this.canvasDimensions.height, data, LineChartComponent.MAX_Y_VALUE));
  }

}
