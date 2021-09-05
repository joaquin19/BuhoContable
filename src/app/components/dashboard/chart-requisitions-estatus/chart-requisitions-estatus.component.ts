import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chart-requisitions-estatus',
  templateUrl: './chart-requisitions-estatus.component.html',
  styleUrls: ['./chart-requisitions-estatus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartRequisitionsEstatusComponent implements OnInit {

  public data: any;
  public chartTitle: string;
  public chartLabel: any;
  public chartLegend: any;
  public chartTooltip: any;
  public enableAnimation: boolean;
  public center: any;
  public startAngle: number;
  public endAngle: number;
  public explode: boolean;

  constructor() {
    this.data = [];
    this.chartTitle = 'Requisiciones por estatus';
    this.chartLabel = {
      visible: true,
      position: 'Inside',
      name: 'text'
    };
    this.chartLegend = {
      visible: true,
      position: 'Bottom',
    };
    this.chartTooltip = {
      enable: true,
      format: '${point.x} : <b>${point.y}</b>'
    };
    this.enableAnimation = true;
    this.center = { x: '50%', y: '50%' };
    this.startAngle = 0;
    this.endAngle = 360;
    this.explode = true;

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.data = [
      { x: 'Nuevas', y: 37, text: '37' },
      { x: 'Autorizadas', y: 19, text: '19' },
      { x: 'Rechazadas', y: 11, text: '11' },
      { x: 'Pendientes por Autorizar', y: 17, text: '17' },
      { x: 'Canceladas', y: 2, text: '2' }
    ];
  }

}
