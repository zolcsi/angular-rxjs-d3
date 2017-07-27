import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as d3 from '../shared/custom-d3';
import { NumberService } from '../shared/number.service';
import { LineChartService } from './line-chart.service';
import { Subscription } from 'rxjs/Subscription';

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

    @Output() chartUpdate = new EventEmitter<number>();

    private containerDimensions = {width: 600, height: 400};
    private margin = {top: 30, right: 20, bottom: 30, left: 50};
    private canvasDimensions = {
        width: this.containerDimensions.width - this.margin.left - this.margin.right,
        height: this.containerDimensions.height - this.margin.top - this.margin.bottom
    };
    private data: number[] = [];
    private canvas;
    private chartInputSubscription: Subscription;

    constructor(private lineChartService: LineChartService,
                private numberService: NumberService) {
    }

    ngOnInit() {
        const self = this;
        const svg = this.createSvg(this.containerDimensions.width, this.containerDimensions.height);
        self.canvas = this.createCanvas(svg, this.margin.left, this.margin.top);

        self.addChart(self.canvas, self.canvasDimensions.height, self.data);
        this.startInputStream(self.canvas);
    }

    onReset() {
        if (this.chartInputSubscription) {
            this.chartInputSubscription.unsubscribe();
        }
        this.data = [];
        this.removeChart(this.canvas);
        this.addChart(this.canvas, this.canvasDimensions.height, this.data);
        this.startInputStream(this.canvas);
    }

    private startInputStream(canvas) {
        const self = this;
        this.chartInputSubscription = this.numberService.randomNumberGenerator()
            .take(LineChartComponent.NUMBER_OF_ELEMENTS)
            .subscribe((num) => {
                console.log('subscription next: ', num);
                self.chartUpdate.emit(num);
                self.data.push(num);
                self.updateChart(canvas, self.data);
            });
    }

    private addChart(canvas, canvasHeight, data) {
        this.addAxisX(canvas, canvasHeight);
        this.addAxisY(canvas);
        this.addLine(canvas, data);
    }

    private updateChart(canvas, data) {
        if (canvas) {
            this.updateAxisX(canvas);
            this.updateAxisY(canvas);
            this.updateLine(canvas, data);
        }
    }

    private removeChart(canvas) {
        this.removeAxisX(canvas);
        this.removeAxisY(canvas);
        this.removeLine(canvas);
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

    private removeAxisX(canvas) {
        canvas
            .select('.x-axis')
            .remove();
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

    private removeAxisY(canvas) {
        canvas
            .select('.y-axis')
            .remove();
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

    private removeLine(canvas) {
        canvas
            .select('.chart-line')
            .remove();
    }
}
