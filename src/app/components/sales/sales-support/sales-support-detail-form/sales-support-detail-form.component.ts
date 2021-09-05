import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  EditSettingsModel, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel, ToolbarItems
} from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

import {
  AlertMessageService, SessionService, SaleSupportHeaderService, SaleSupportDetailService
} from '@app/core/services';

@Component({
  selector: 'app-sales-support-detail-form',
  templateUrl: './sales-support-detail-form.component.html',
  styleUrls: ['./sales-support-detail-form.component.scss']
})
export class SalesSupportDetailFormComponent implements OnInit {

  @Input() item: any;

  @ViewChild('gridSalesSupport', { static: false })
  public gridSalesSupport: GridComponent;

  public colsSaleSupport: any;
  public itemsPage: any;
  public filterGrid: any;
  public gridLines: GridLine;
  public toolbarOptions: ToolbarItems[];
  public editOptions: EditSettingsModel;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public submitted: boolean;
  public titleHeader: string;
  public pageRedirect: string;
  public currentUser: any;
  public titleExcel: string;

  public salesSupport: any;
  public listSalesSupport: any;
  public listheader: any;
  public setfield: any;
  public toolbar: any;
  public listMonths: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private saleSupportHeaderService: SaleSupportHeaderService,
    private saleSupportDetailService: SaleSupportDetailService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.submitted = false;
    this.titleHeader = '';
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.setfield = { text: 'Name' };
    this.titleExcel = 'Ventas Facturación';
    this.salesSupport = {};
    this.pageRedirect = '/sales/sales-support';
    this.colsSaleSupport = [];
    this.listMonths = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.colsSaleSupport = [
      { field: 'shippingDate', header: 'FECHA', width: 200, textAlign: 'Center' },
      { field: 'folio', header: 'FOLIO REMISIÓN', width: 200, textAlign: 'Center' },
      { field: 'partName', header: 'NO. PARTE', width: 250, textAlign: 'Center' },
      { field: 'quantity', header: 'CANTIDAD', width: 150, textAlign: 'Center' },
      { field: 'salePrice', header: 'PRECIO UNITARIO', width: 150, format: 'C4', textAlign: 'Center' },
      { field: 'subTotal', header: 'SUB TOTAL', width: 150, format: 'C4', textAlign: 'Center' },
      { field: 'reference', header: 'REFERENCA', width: 150, textAlign: 'Center' },
      { field: 'observations', header: 'OBSERVACIÓNES', width: 150, textAlign: 'Center' }
    ];

    this.titleHeader = 'Detalle de Orden de Compra';
    this.getSaleSupportHeaderId(this.item.id);
    this.getSaleSupportDetail(this.item.id);

    this.listMonths = [
      { number: 1, name: 'Enero' },
      { number: 2, name: 'Febrero' },
      { number: 3, name: 'Marzo' },
      { number: 4, name: 'Abril' },
      { number: 5, name: 'Mayo' },
      { number: 6, name: 'Junio' },
      { number: 7, name: 'Julio' },
      { number: 8, name: 'Agosto' },
      { number: 9, name: 'Septiembre' },
      { number: 10, name: 'Octubre' },
      { number: 11, name: 'Noviembre' },
      { number: 12, name: 'Diciembre' }
    ];
  }

  getSaleSupportHeaderId(saleSupportId) {
    this.spinner.show();
    this.saleSupportHeaderService.getSaleSupportById(saleSupportId).subscribe(
      data => {
        this.salesSupport = data;
        this.salesSupport.startDate = moment(`${this.salesSupport.startDate}`, 'DD-MM-YYYY').format('YYYY-MM-DD');
        this.salesSupport.endDate = moment(`${this.salesSupport.endDate}`, 'DD-MM-YYYY').format('YYYY-MM-DD');
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSaleSupportDetail(saleSupportHeaderId) {
    this.saleSupportDetailService.getSaleSupportDetailByHeaderId(saleSupportHeaderId).subscribe(
      data => {
        this.listSalesSupport = data;
        this.listSalesSupport.map(support =>
          support.shippingDate = moment(`${support.shippingDate}`, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD')
        );
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  excelExport(): void {

    const reportParams: any = {};
    reportParams.customerName = this.salesSupport.customerName;
    const monthNumber = parseInt(moment(`${this.salesSupport.startDate}`, 'YYYY-MM-DD').format('M'), 0);
    reportParams.monthName = this.listMonths.filter(month => month.number === monthNumber)[0].name;
    reportParams.startDate = this.salesSupport.startDate;
    reportParams.endDate = this.salesSupport.endDate;
    reportParams.currencyCode = this.salesSupport.currencyCode;

    const detailArray = [];
    for (const saleSupport of this.listSalesSupport) {
      detailArray.push({
        folio: saleSupport.id,
        shippingDate: saleSupport.shippingDate,
        partNumber: saleSupport.partNumber,
        partName: saleSupport.partName,
        quantity: saleSupport.quantity,
        salePrice: saleSupport.salePrice,
        subTotal: saleSupport.subTotal,
        taxes: saleSupport.total - saleSupport.subTotal,
        total: saleSupport.total,
        customerName: this.salesSupport.customerName,
        reference: saleSupport.reference,
        observations: saleSupport.observations
      });
    }
    reportParams.detail = detailArray;

    this.spinner.show();
    this.saleSupportHeaderService.getSaleSupportReport(reportParams).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `Soporte_Venta_${this.salesSupport.folio}.xlsx`);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });

  }

}
