import { Injectable } from '@angular/core';
import * as d3 from '../shared/custom-d3';

@Injectable()
export class LineChartService {

  constructor() { }

  createAxisXFunction(canvasWidth: number, numOfTicks: number, dataLength: number): Function {
    const calcX = d3.scaleLinear().domain([0, dataLength]).range([0, canvasWidth]);
    return d3.axisBottom(calcX).ticks(numOfTicks);
  }

  createAxisYFunction(canvasHeight: number, numOfTicks: number, maxYValue: number): Function {
    const calcY = d3.scaleLinear().domain([0, maxYValue]).range([canvasHeight, 0]);
    return d3.axisLeft(calcY).ticks(numOfTicks);
  }

  createLineFunction(canvasWidth: number, canvasHeight: number,  data: number[], maxYValue: number) {
    const calcX = d3.scaleLinear().domain([0, data.length]).range([0, canvasWidth]);
    const calcY = d3.scaleLinear().domain([0, maxYValue]).range([canvasHeight, 0]);
    return d3.line()
      .x((d, i) => calcX(i))
      .y((d, i) => calcY(+d))
      .curve(d3.curveLinear);
  }

}
