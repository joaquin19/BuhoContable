import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chart-expenses-business-unit',
  templateUrl: './chart-expenses-business-unit.component.html',
  styleUrls: ['./chart-expenses-business-unit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartExpensesBusinessUnitComponent implements OnInit {

  public data: any;
  public data1: any;
  public data2: any;
  public data3: any;
  public data4: any;
  public data5: any;
  public data6: any;
  public data7: any;

  public title: string;
  public xAxis: any;
  public yAxis: any;
  public tooltip: any;
  public placement: boolean;
  public marker: any;

  constructor() {
    this.data = [];
    this.title = 'Gastos por Unidad de Negocio';
    this.xAxis = {
      title: 'Mes',
      valueType: 'Category'
    };
    this.yAxis = {
      title: 'Total',
      labelFormat: 'c'
    };
    this.tooltip = {
      enable: true
    };
    this.placement = false;
    this.marker = {
      dataLabel: {
        visible: true
      }
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

    this.data2 = [
      { month: 'Enero', amount: 26759524 },
      { month: 'Febrero', amount: 23631051 },
      { month: 'Marzo', amount: 30370532 },
      { month: 'Abril', amount: 24306819 },
      { month: 'Mayo', amount: 5960786 },
      { month: 'Junio', amount: 4426311 },
      { month: 'Julio', amount: 8960786 },
      { month: 'Agosto', amount: 10426311 }
    ];

    this.data3 = [
      { month: 'Enero', amount: 26759524 },
      { month: 'Febrero', amount: 23631051 },
      { month: 'Marzo', amount: 30370532 },
      { month: 'Abril', amount: 24306819 },
      { month: 'Mayo', amount: 5960786 },
      { month: 'Junio', amount: 4426311 },
      { month: 'Julio', amount: 8960786 },
      { month: 'Agosto', amount: 10426311 }
    ];

    this.data4 = [
      { month: 'Enero', amount: 26759524 },
      { month: 'Febrero', amount: 23631051 },
      { month: 'Marzo', amount: 30370532 },
      { month: 'Abril', amount: 24306819 },
      { month: 'Mayo', amount: 5960786 },
      { month: 'Junio', amount: 4426311 },
      { month: 'Julio', amount: 8960786 },
      { month: 'Agosto', amount: 10426311 }
    ];

    this.data5 = [
      { month: 'Enero', amount: 26759524 },
      { month: 'Febrero', amount: 23631051 },
      { month: 'Marzo', amount: 30370532 },
      { month: 'Abril', amount: 24306819 },
      { month: 'Mayo', amount: 5960786 },
      { month: 'Junio', amount: 4426311 },
      { month: 'Julio', amount: 8960786 },
      { month: 'Agosto', amount: 10426311 }
    ];

    this.data6 = [
      { month: 'Enero', amount: 26759524 },
      { month: 'Febrero', amount: 23631051 },
      { month: 'Marzo', amount: 30370532 },
      { month: 'Abril', amount: 24306819 },
      { month: 'Mayo', amount: 5960786 },
      { month: 'Junio', amount: 4426311 },
      { month: 'Julio', amount: 8960786 },
      { month: 'Agosto', amount: 10426311 }
    ];

    this.data7 = [
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
