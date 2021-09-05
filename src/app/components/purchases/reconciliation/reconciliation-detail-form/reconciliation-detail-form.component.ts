import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ReconciliationHeaderService } from '@app/core/services/reconciliation-header.service';
import { FilterSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import * as numeral from 'numeral';
import { AlertMessageService, PurchaseOrderDetailService, SessionService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupplierInvoiceDetailService } from '@app/core/services/supplier-invoice-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reconciliation-detail-form',
  templateUrl: './reconciliation-detail-form.component.html',
  styleUrls: ['./reconciliation-detail-form.component.scss']
})
export class ReconciliationDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;

  @ViewChild('gridPurchaseOrders', { static: false })
  public gridPurchaseOrders: GridComponent;
  @ViewChild('gridInvoices', { static: false })
  public gridInvoices: GridComponent;

  public cols: any;
  public colsPO: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public selectOptions: object;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public invoice: any;
  public listInvoiceDetail: any;
  public listPurchaseOrderDetail: any;
  public titleHeader: string;
  public reconciliation: any;
  public totalPurchaseOrder: any;
  public totalInvoice: any;
  public loadedOneTime: boolean;
  public loadedPurchaseOrder: boolean;
  public loadedInvoive: boolean;
  public currentUser: any;
  public pageRedirect: string;

  constructor(
    private route: ActivatedRoute,
    private alertMessageService: AlertMessageService,
    private reconciliationHeaderService: ReconciliationHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private supplierInvoiceDetailService: SupplierInvoiceDetailService,
    private sessionService: SessionService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.totalPurchaseOrder = 0;
    this.totalInvoice = 0;
    this.listInvoiceDetail = [];
    this.listPurchaseOrderDetail = [];
    this.titleHeader = 'Detalle Conciliación';
    this.pageRedirect = '/purchases/reconciliation';
    this.reconciliation = {
      id: 0,
      createBy: 'admin',
      supplierInvoiceHeaderId: 0,
      discrepancy: '',
      justification: ''
    };
    this.loadedOneTime = false;
    this.loadedPurchaseOrder = false;
    this.loadedInvoive = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.selectOptions = { type: 'Multiple' };
    this.colsPO = [
      { field: 'OrderID', isPrimaryKey: 'true', headerText: 'Order ID', width: '80', textAlign: 'Right', visible: false },
      { field: 'id', headerText: 'purchaseOrderDetailId', width: 80, textAlign: 'center', visible: false },
      { field: 'purchaseOrderHeaderId', headerText: 'NO. OC', width: 80, textAlign: 'center' },
      { field: 'description', headerText: 'DESCRIPCIÓN', width: 175, textAlign: 'left' },
      { field: 'quantity', headerText: 'CANTIDAD', width: 100, textAlign: 'center' },
      { field: 'unitMeasureName', headerText: 'U/M', width: 55, textAlign: 'center' },
      { field: 'unitPrice', headerText: 'PRECIO UNITARIO', width: 155, textAlign: 'right', format: '$0,0.00' },
      { field: 'subTotal', headerText: 'PRECIO TOTAL', width: 150, textAlign: 'right', format: '$0,0.00' },
      { field: 'total', headerText: 'PRECIO TOTAL', width: 150, textAlign: 'right', format: '$0,0.00', visible: false }
    ];
    this.cols = [
      { field: 'id', headerText: 'id', width: 100, textAlign: 'center', visible: false },
      { field: 'supplierInvoiceHeaderId', headerText: 'supplierInvoiceID', width: 100, textAlign: 'center', visible: false },
      { field: 'quantity', headerText: 'CANTIDAD', width: 100, textAlign: 'center' },
      { field: 'unitMeasure', headerText: 'U/M', width: 150, textAlign: 'center' },
      { field: 'unitPrice', headerText: 'PRECIO UNITARIO', width: 160, textAlign: 'right', format: '$0,0.00' },
      { field: 'subTotal', headerText: 'PRECIO TOTAL', width: 150, textAlign: 'right', format: '$0,0.00' },
      { field: 'total', headerText: 'PRECIO TOTAL', width: 150, textAlign: 'right', format: '$0,0.00', visible: false }
    ];
    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      this.reconciliation = {
        id: params.id,
        createBy: '',
        invoice: 0
      };
      console.log('reconciliacion id');
      console.log(this.reconciliation);
      this.getReconciliationHeaderById();
    });
    this.getListPurchaseOrderDetail();
    this.getListInvoiceDetail();
  }

  public downloadPDF() {
    const dateCreateOn = (moment(`${this.reconciliation.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF =
      `C${this.reconciliation.id}(${this.reconciliation.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.reconciliationHeaderService.getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  public showPDF() {
    const documentDefinition =
      this.reconciliationHeaderService.getDocumentDefinition(this.listPurchaseOrderDetail, this.listInvoiceDetail, this.reconciliation);
    pdfMake.createPdf(documentDefinition).open();
  }

  getReconciliationHeaderById() {
    this.spinner.show();
    this.reconciliationHeaderService.getReconciliationById(this.reconciliation.id).subscribe(data => {
      this.reconciliation = data;
      this.reconciliation.receptionDate = moment(this.reconciliation.receptionDate).format('YYYY-MM-DD');
      this.reconciliation.startPeriod =
        this.reconciliation.startPeriod !== null ? moment(`${this.reconciliation.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
      this.reconciliation.endPeriod =
        this.reconciliation.endPeriod !== null ? moment(`${this.reconciliation.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
      this.reconciliation.period = (this.reconciliation.startPeriod !== null) ? this.reconciliation.startPeriod + ' - ' + this.reconciliation.endPeriod : '';
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  getListPurchaseOrderDetail() {
    this.spinner.show();
    this.purchaseOrderDetailService.getPurchaseOrderDetailByReconciliation(this.reconciliation.id).subscribe(data => {
      this.listPurchaseOrderDetail = data;
      this.calculatePurchaseOrderTotal();
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  calculatePurchaseOrderTotal() {
    this.totalPurchaseOrder = 0;
    this.listPurchaseOrderDetail.forEach(element => {
      this.totalPurchaseOrder = numeral(numeral(this.totalPurchaseOrder).value() + element.total).format('$0,0.00');
    });
  }

  getListInvoiceDetail() {
    this.spinner.show();
    this.supplierInvoiceDetailService.getSupplierInvoiceDetailByReconciliationId(this.reconciliation.id).subscribe(data => {
      this.listInvoiceDetail = data;
      this.listInvoiceDetail.forEach(element => {
        element.remarck = true;
      });
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  calculateInvoiceTotal() {
    this.totalInvoice = 0;
    this.listInvoiceDetail.forEach(element => {
      this.totalInvoice = numeral(numeral(this.totalInvoice).value() + element.total).format('$0,0.00');
    });
  }

  dataBound(event) {
    console.log('dataBound');
    this.loadedPurchaseOrder = true;
  }

  dataBoundInvoice(event) {
    this.loadedInvoive = true;
    console.log('dataBoundInvoice');
    if (this.loadedPurchaseOrder && this.loadedOneTime == false) {
      this.calculateInvoiceTotal();
      if (this.listInvoiceDetail.length > 0 && this.listInvoiceDetail.length > 0) {
        console.log('remarck');
        this.loadedOneTime = true;
        this.loadedPurchaseOrder = false;
        this.refreshRemarck();
      }
    }
  }

  refreshRemarck() {
    let i = 0;
    const sizePurchaseOrder = this.listPurchaseOrderDetail.length;
    this.listInvoiceDetail.forEach(element => {
      if (i < sizePurchaseOrder) {
        console.log(numeral(this.listPurchaseOrderDetail[i].subTotal).format('$0,0.00') + ' --- ' + numeral(element.subTotal).format('$0,0.00'));
        element.remarck = (numeral(this.listPurchaseOrderDetail[i].subTotal).format('$0,0.00') == numeral(element.subTotal).format('$0,0.00')) ? true : false;
      } else {
        element.remarck = false;
      }
      i++;
    });
    this.gridInvoices.refresh();
  }

  confirmAuthorization() {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea enviar a <strong class="text-success">autorizar</strong> la conciliación con número factura <br><strong>${this.reconciliation.numberInvoice}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.sendAuthorization(this.reconciliation.id, this.currentUser.userName);
      }
    });
  }

  sendAuthorization(id, userName) {
    const reconciliationSave: any = {};
    reconciliationSave.id = id;
    reconciliationSave.createBy = userName;

    this.spinner.show();
    this.reconciliationHeaderService.updateReconciliationSendAuthorization(reconciliationSave).subscribe(
      data => {
        this.alertMessageService.successMessage('Conciliación enviada a autorizar correctamente.');
        this.router.navigate([this.pageRedirect]);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
