import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { ProjectSettings } from '@app/core/constants';
import {
  AlertMessageService, PurchaseOrderHeaderService, SessionService, PurchaseOrderDetailService, TaxService
} from '@app/core/services';
import { PurchaseOrderDocumentService } from '@app/core/services/purchase-order-document.service';
import { PurchaseOrderDetailTaxService } from '@app/core/services/purchase-order-detail-tax.service';
import { FilterSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import * as numeral from 'numeral';

@Component({
  selector: 'app-purchase-orders-detail-form',
  templateUrl: './purchase-orders-detail-form.component.html',
  styleUrls: ['./purchase-orders-detail-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchaseOrdersDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;

  @ViewChild('gridPurchaseOrderDetail', { static: false })
  public gridPurchaseOrderDetail: GridComponent;
  @ViewChild('carousel') carousel: any;

  /***** carousel *****/
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = true;
  /***** fin carousel *****/

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
  public maxLengthNotes: number;
  public maxLengthObservations: number;
  public purchaseOrderDocument: any;
  public purchaseOrderImages: any;
  public typesImages: string[];
  public listDocumentSelected: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public dataEvent: any;
  public imageNameSelected: string;
  public total: any;
  public subTotal: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private purchaseOrderDocumentService: PurchaseOrderDocumentService,
    private purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    private taxService: TaxService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.cols = [];
    this.maxLengthNotes = 200;
    this.maxLengthObservations = 200;

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
      previousAmount: '',
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
    this.purchaseOrderDocument = [];
    this.purchaseOrderImages = [];
    this.listPurchaseOrderDetail = [];
    this.typesImages = ['.png', '.jpg', '.jpeg'];
    this.dataEvent = { current: 'slideId_0' };
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
    this.titleHeader = 'Detalle de Orden de Compra';
    this.getPurchaseOrderById(this.item.id);
    this.getPurchaseOrderDocuments(this.item.id);
  }

  getPurchaseOrderById(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderHeaderService.getPurchaseOrderById(purchaseOrderId).subscribe(
      data => {
        this.purchaseOrder = data;
        this.purchaseOrder.supplierContactName = this.purchaseOrder.supplierContactName !== null ? this.purchaseOrder.supplierContactName : '';
        this.purchaseOrder.supplierPhone = this.purchaseOrder.supplierPhone !== null ? this.purchaseOrder.supplierPhone : '';
        this.purchaseOrder.notes = this.purchaseOrder.notes !== null ? this.purchaseOrder.notes : '';
        this.purchaseOrder.observations = this.purchaseOrder.observations !== null ? this.purchaseOrder.observations : '';
        this.purchaseOrder.startPeriod =
          this.purchaseOrder.startPeriod !== null ? moment(`${this.purchaseOrder.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.endPeriod =
          this.purchaseOrder.endPeriod !== null ? moment(`${this.purchaseOrder.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY') : '';
        this.purchaseOrder.period = this.purchaseOrder.startPeriod + ' - ' + this.purchaseOrder.endPeriod;
        this.purchaseOrder.currencyFullName = this.purchaseOrder.currencyCode + ' - ' + this.purchaseOrder.currencyName;
        this.getPurchaseOrderDetail(this.purchaseOrder.id);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.spinner.hide();
      });
  }

  getPurchaseOrderDetail(purchaseOrderHeaderId) {
    this.spinner.show();
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(purchaseOrderHeaderId).subscribe(
      data => {
        this.listPurchaseOrderDetail = data;
        this.getPurchaseOrderDetailTaxByHeader(purchaseOrderHeaderId);
        this.calculationTotal();
        this.spinner.hide();
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
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

  getPurchaseOrderDocuments(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderDocumentService.getPurchaseOrderDocumentsByHeaderId(purchaseOrderId).subscribe(
      data => {
        this.purchaseOrderDocument = data;
        let imageExtension = '';
        this.purchaseOrderImages = [];
        this.purchaseOrderDocument.forEach(element => {
          imageExtension = (element.userName.substr(element.userName.lastIndexOf('.'))).toLowerCase();
          if (this.typesImages.indexOf(imageExtension) !== -1) {
            this.purchaseOrderImages.push(element);
          }
        });
        this.imageNameSelected = this.purchaseOrderDocument.length !== 0 ? this.purchaseOrderDocument[0].userName : '';
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  downloadDocument(document) {
    this.spinner.show();
    this.purchaseOrderDocumentService.downloadPurchaseOrderDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(event) {
    this.dataEvent = event;
    this.imageNameSelected = this.purchaseOrderImages[this.dataEvent.current].userName;
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
