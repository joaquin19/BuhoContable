import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chart-accounts',
  templateUrl: './chart-accounts.component.html',
  styleUrls: ['./chart-accounts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartAccountsComponent implements OnInit {

  public data: any;
  public data1: any;
  public chartTitle: string;
  public xAxis: any;
  public yAxis: any;
  public chartLegend: any;
  public markerSettings: any;
  public chartTooltip: any;

  constructor() {
    this.data = [];
    this.data1 = [];
    this.chartTitle = 'Cuentas por Pagar / Cuentas por Cobrar';
    this.xAxis = {
      title: 'Mes',
      valueType: 'Category'
    };
    this.yAxis = {
      title: 'Total',
      labelFormat: 'c'
    };
    this.chartLegend = {
      visible: true
    };
    this.markerSettings = {
      visible: true,
      dataLabel: {
        visible: true
      }
    };
    this.chartTooltip = {
      enable: true,
      format: '${point.x} : <b>${point.y}</b>'
    };

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.data = [
      { month: 'Enero', amount: 25972147 },
      { month: 'Febrero', amount: 22377668 },
      { month: 'Marzo', amount: 30874076 },
      { month: 'Abril', amount: 24504102 },
      { month: 'Mayo', amount: 6137946 },
      { month: 'Junio', amount: 9852857 },
      { month: 'Julio', amount: 7137946 },
      { month: 'Agosto', amount: 8852857 }
    ];

    this.data1 = [
      { month: 'Enero', amount: 26759524 },
      { month: 'Febrero', amount: 23631051 },
      { month: 'Marzo', amount: 30370532 },
      { month: 'Abril', amount: 24306819 },
      { month: 'Mayo', amount: 5960786 },
      { month: 'Junio', amount: 4426311 },
      { month: 'Julio', amount: 8960786 },
      { month: 'Agosto', amount: 10426311 }
    ];
  }

}
