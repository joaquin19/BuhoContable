import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  AlertMessageService, PurchaseOrderHeaderService, PurchaseOrderDetailService,
  SessionService, TaxService
} from '@app/core/services';
import { PurchaseOrderDetailTaxService } from '@app/core/services/purchase-order-detail-tax.service';
import { Action } from '@app/core/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import * as numeral from 'numeral';

@Component({
  selector: 'app-purchase-orders-received-form',
  templateUrl: './purchase-orders-received-form.component.html',
  styleUrls: ['./purchase-orders-received-form.component.scss']
})
export class PurchaseOrdersReceivedFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('gridPurchaseOrderDetail', { static: false })
  public gridPurchaseOrderDetail: GridComponent;

  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public titleHeader: string;
  public listHeaders: any;
  public purchaseOrder: any;
  public listPurchaseOrderDetail: any;
  public pageRedirect: string;
  public currentUser: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public total: any;
  public subTotal: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    private taxService: TaxService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.purchaseOrder = {
      id: 0,
      folio: '',
      purchaseOrderTypeId: 0,
      purchaseOrderTypeName: '',
      businessUnitId: 0,
      businessUnitName: '',
      costCenterId: 0,
      costCenterName: '',
      requisitionHeader: 0,
      supplierId: 0,
      supplierName: '',
      supplierContactId: 0,
      supplierContactName: '',
      supplierPhone: '',
      paymentTypeId: 0,
      paymentTypeName: '',
      statusId: 0,
      statusNameName: '',
      startPeriod: '',
      endPeriod: '',
      period: '',
      estimatedDate: '',
      subTotal: 0,
      total: 0,
      notes: '',
      observations: '',
      createBy: '',
      createdOn: ''
    };
    this.listTaxesDetail = [];
    this.listTaxesAdded = [];
    this.listTaxes = [];
    this.listPurchaseOrderDetail = [];
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.cols = [];
    this.total = 0;
    this.subTotal = 0;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'code', header: 'NO. PARTE', width: 80 },
      { field: 'name', header: 'DESCRIPCIÓN', width: 250 },
      { field: 'quantity', header: 'CANTIDAD', width: 80 },
      { field: 'unitMeasureName', header: 'U/M', width: 80 },
      { field: 'dimension', header: 'DIMENSIÓN', width: 100, visible: false },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'subTotal', header: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'total', header: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000', visible: false }
    ];
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Edit:
        this.titleHeader = 'Detalle de Orden de Compra';
        break;
    }
    this.getPurchaseOrder();
  }

  public downloadPDF() {
    const dateCreateOn = (moment(`${this.purchaseOrder.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF = `P${this.purchaseOrder.id}(${this.purchaseOrder.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.purchaseOrderHeaderService.getDocumentDefinition(this.cols, this.listPurchaseOrderDetail,
        this.purchaseOrder, this.listTaxesAdded);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  public showPDF() {
    const documentDefinition =
      this.purchaseOrderHeaderService.getDocumentDefinition(this.cols, this.listPurchaseOrderDetail,
        this.purchaseOrder, this.listTaxesAdded);
    pdfMake.createPdf(documentDefinition).open();
  }

  getPurchaseOrder() {
    this.spinner.show();
    this.purchaseOrderHeaderService.getPurchaseOrderById(this.item.id).subscribe(
      data => {
        this.purchaseOrder = data;
        this.purchaseOrder.supplierContactName = this.purchaseOrder.supplierContactName !== null ? this.purchaseOrder.supplierContactName : '';
        this.purchaseOrder.supplierPhone = this.purchaseOrder.supplierPhone !== null ? this.purchaseOrder.supplierPhone : '';
        this.purchaseOrder.notes = this.purchaseOrder.notes !== null ? this.purchaseOrder.notes : '';
        this.purchaseOrder.observations = this.purchaseOrder.observations !== null ? this.purchaseOrder.observations : '';
        this.purchaseOrder.estimatedDate =
          this.purchaseOrder.estimatedDate !== null ? moment(`${this.purchaseOrder.estimatedDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.startPeriod =
          this.purchaseOrder.startPeriod !== null ? moment(`${this.purchaseOrder.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.endPeriod =
          this.purchaseOrder.endPeriod !== null ? moment(`${this.purchaseOrder.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.period =
          this.purchaseOrder.startPeriod + ' - ' + this.purchaseOrder.endPeriod;
        this.getPurchaseOrderDetail();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.spinner.hide();
      });
  }

  getPurchaseOrderDetail() {
    this.spinner.show();
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(this.purchaseOrder.id).subscribe(
      data => {
        this.listPurchaseOrderDetail = data;
        this.getPurchaseOrderDetailTaxByHeader(this.purchaseOrder.id);
        this.calculationTotal();
        this.spinner.hide();
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPurchaseOrderDetailTaxByHeader(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderDetailTaxService.GetPurchaseOrderDetailTaxByPOH(purchaseOrderId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getTaxes() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        for (const item of this.listTaxes) {
          item.amount = 0;
        }
        this.calculationTaxes();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  calculationTaxes() {
    for (const itemT of this.listTaxes) {
      itemT.amount = 0;
    }
    for (const itemD of this.listTaxesDetail) {
      for (const itemT of this.listTaxes) {
        if (itemD.taxId === itemT.id) {
          itemT.amount = numeral(numeral(itemT.amount).value() + numeral(itemD.amount).value()).format('$0,0.0000');
        }
      }
    }
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
    this.calculationTotal();
  }

  calculationTotal() {
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listPurchaseOrderDetail) {
      this.subTotal = numeral(numeral(this.subTotal).value() + item.subTotal).format('$0,0.0000');
      this.total = numeral(numeral(this.total).value() + item.total).format('$0,0.0000');
    }
  }

}
