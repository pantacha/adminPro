import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-donut',
    templateUrl: './donut.component.html',
    styles: []
})
export class DonutComponent implements OnInit {

    @Input() doughnutChartLabels: string[] = [];
    @Input() doughnutChartData: number[] = [];
    @Input() doughnutChartType: string = '';
    
    constructor(){}

    ngOnInit(){}
}
