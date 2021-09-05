import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chart-purchase-orders-estatus',
  templateUrl: './chart-purchase-orders-estatus.component.html',
  styleUrls: ['./chart-purchase-orders-estatus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartPurchaseOrdersEstatusComponent implements OnInit {

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
    this.chartTitle = 'Ordenes de Compra por estatus';
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
      { x: 'Nuevas', y: 37, text: '20' },
      { x: 'Autorizadas', y: 19, text: '10' },
      { x: 'Rechazadas', y: 11, text: '7' },
      { x: 'Pendientes por Autorizar', y: 17, text: '9' },
      { x: 'Canceladas', y: 1, text: '1' }
    ];
  }

}
