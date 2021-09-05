import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { ReconciliationHeaderService } from '@app/core/services/reconciliation-header.service';
import { PurchaseOrderDetailService } from '@app/core/services/purchase-order-detail.service';
import { FilterSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReconciliationPurchaseOrderDetailService } from '@app/core/services/reconciliation-purchase-order-detail.service';
import { SupplierInvoiceDetailService } from '@app/core/services/supplier-invoice-detail.service';
import * as numeral from 'numeral';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { SupplierInvoiceHeaderService } from '@app/core/services/supplier-invoice-header.service';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { SupplierInvoiceDocumentService } from '@app/core/services/supplier-invoice-document.service';

@Component({
  selector: 'app-reconciliation-edition-form',
  templateUrl: './reconciliation-edition-form.component.html',
  styleUrls: ['./reconciliation-edition-form.component.scss']
})
export class ReconciliationEditionFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;

  @ViewChild('formReconciliation', { static: false })
  public formReconciliation: NgForm;
  @ViewChild('gridPurchaseOrders', { static: false })
  public gridPurchaseOrders: GridComponent;
  @ViewChild('gridInvoices', { static: false })
  public gridInvoices: GridComponent;
  @ViewChild('dateformat')
  public dateRangeObj: DateRangePickerComponent;

  /***** date Range Picker *****/
  public format: string;
  public startDate: Date;
  public endDate: Date;
  /***** fin date Range Picker *****/

  public cols: any;
  public colsPO: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public reconciliation: any;
  public invoice: any;
  public listInvoiceDetail: any;
  public listPurchaseOrderDetail: any;
  public titleHeader: string;
  public selectOptions: object;
  public currentUser: any;
  public fileUpload: any;
  public typesFiles: string[];
  public typesFilesPDF: string[];
  public files: any;
  public submitted: boolean;
  public pageRedirect: string;
  public actionForm: Action;
  public totalPurchaseOrder: any;
  public totalInvoice: any;
  public currency: string;
  public refresh: boolean;
  public loadedOneTime: boolean;
  public loadedPurchaseOrder: boolean;
  public loadedInvoive: boolean;
  public listDocuments: any;
  public InvoicePDFId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private reconciliationHeaderService: ReconciliationHeaderService,
    private reconciliationPurchaseOrderDetailService: ReconciliationPurchaseOrderDetailService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private supplierInvoiceDetailService: SupplierInvoiceDetailService,
    private supplierInvoiceHeaderService: SupplierInvoiceHeaderService,
    private supplierInvoiceDocumentService: SupplierInvoiceDocumentService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.reconciliation = {
      id: 0,
      createBy: 'admin',
      supplierInvoiceHeaderId: 0,
      discrepancy: '',
      justification: ''
    };

    this.totalPurchaseOrder = 0;
    this.totalInvoice = 0;
    this.listInvoiceDetail = [];
    this.listPurchaseOrderDetail = [];
    this.titleHeader = 'Editar Conciliación';
    this.fileUpload = [];
    this.typesFiles = ['.xml'];
    this.typesFilesPDF = ['.pdf'];
    this.files = [];
    this.submitted = false;
    this.actionForm = Action.None;
    this.pageRedirect = '/purchases/reconciliation';
    this.currency = '';
    this.refresh = false;
    this.loadedOneTime = false;
    this.loadedPurchaseOrder = false;
    this.loadedInvoive = false;
    this.listDocuments = [];
    this.InvoicePDFId = 0;

    /***** date Range Picker *****/
    this.format = 'yyyy\'\-\'MM\'\-\'dd';
    this.startDate = moment().toDate();
    this.endDate = moment().add(7, 'days').toDate();
    /***** fin date Range Picker *****/
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

  showForm() {
    this.route.params.subscribe((params) => {
      this.reconciliation = {
        id: params.id,
        createBy: 'admin',
        invoice: 0
      };
      this.getReconciliationHeaderById();
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addInvoice':
            this.titleHeader = 'Nueva Conciliación';
            this.actionForm = Action.Create;
            break;
          case 'editReconciliation':
            this.titleHeader = 'Editar Conciliación';
            this.actionForm = Action.Edit;
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
    this.getListPurchaseOrderDetail();
    this.getListInvoiceDetail();
  }

  getReconciliationHeaderById() {
    this.spinner.show();
    this.reconciliationHeaderService.getReconciliationById(this.reconciliation.id).subscribe(data => {
      this.reconciliation = data;
      this.reconciliation.receptionDate = moment(this.reconciliation.receptionDate).format('YYYY-MM-DD');
      if (this.reconciliation.startPeriod != null) {
        this.startDate = (moment(this.reconciliation.startPeriod, 'DD-MM-YYYY').toDate());
        this.endDate = (moment(this.reconciliation.endPeriod, 'DD-MM-YYYY').toDate());
      }
      if (this.reconciliation.supplierInvoiceHeaderId > 0) {
        this.getDocumentsSupplierInvoice();
      }
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

  getDocumentsSupplierInvoice() {
    this.spinner.show();
    this.supplierInvoiceDocumentService.getSupplierInvoiceDocumentsByHeaderId(this.reconciliation.supplierInvoiceHeaderId).subscribe(data => {
      this.listDocuments = data;
      let extension = '';
      this.listDocuments.forEach(element => {
        extension = (element.userName).split('.');
        if (extension[1] === 'pdf') {
          this.InvoicePDFId = element.id;
        }
      });
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea <strong class="text-danger">eliminar</strong> el artículo <strong>${item.description}</strong> de la orden de compra <br><strong>${item.purchaseOrderHeaderId}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deletePurchaseOrderDetail(item.id, this.currentUser.userName);
      }
    });
  }

  deletePurchaseOrderDetail(purchaseOrderDetailId, deletedBy) {
    this.spinner.show();
    this.reconciliationPurchaseOrderDetailService.deleteReconciliationDetailByPurchaseOrderDetail(purchaseOrderDetailId, this.reconciliation.id, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Detalle de conciliación eliminada correctamente.');
        this.getListPurchaseOrderDetail();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  invoiceXLSSelect(event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      return;
    }
    const fileItem = { file };
    this.saveXLS(fileItem);
  }

  saveXLS(fileItem) {
    let fileSave: any = {};

    fileSave.Id = this.reconciliation.id;
    fileSave.CreateBy = this.currentUser.userName;
    fileSave.SupplierId = this.reconciliation.supplierId;
    fileSave.document = [];

    fileSave.document.push({
      id: 0,
      userName: fileItem.file.name,
      systemName: '',
      path: ''
    });

    const formData = new FormData();

    formData.append('file', fileItem.file, fileItem.file.name);
    formData.append('reconciliationHeaderSave', JSON.stringify(fileSave));

    this.spinner.show();
    this.reconciliationHeaderService.saveSupplierInvoiceXML(formData).subscribe(data => {
      this.alertMessageService.successMessage('XML guardado correctamente.');
      this.reconciliation.supplierInvoiceHeaderId = data.supplierInvoiceHeaderId;
      this.getReconciliationHeaderById();
      this.getListInvoiceDetail();
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  invoicePDFSelect(event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    if (this.typesFilesPDF.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFilesPDF}`);
      return;
    }
    const fileItem = { file };
    this.savePDF(fileItem);
  }

  savePDF(fileItem) {
    let fileSave: any = {};

    fileSave.Id = this.reconciliation.id;
    fileSave.CreateBy = this.currentUser.userName;
    fileSave.SupplierId = this.reconciliation.supplierId;
    fileSave.document = [];

    fileSave.document.push({
      id: 0,
      supplierInvoiceHeaderId: this.reconciliation.supplierInvoiceHeaderId,
      userName: fileItem.file.name,
      systemName: '',
      path: ''
    });

    console.log(fileSave);

    const formData = new FormData();

    formData.append('files', fileItem.file, fileItem.file.name);
    formData.append('supplierInvoiceDocumentSave', JSON.stringify(fileSave));

    this.spinner.show();
    this.supplierInvoiceHeaderService.saveSupplierInvoiceDocument(formData).subscribe(data => {
      this.alertMessageService.successMessage('PDF guardado correctamente.');
      // this.reconciliation.supplierInvoiceHeaderId = data.supplierInvoiceHeaderId;
      // this.getListInvoiceDetail();
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  saveForm() {

    console.log(this.listPurchaseOrderDetail);

    this.submitted = true;

    if (this.formReconciliation.invalid) {
      return;
    }
    const reconciliationHeaderSave: any = {};

    reconciliationHeaderSave.id = this.reconciliation.id;
    reconciliationHeaderSave.startPeriod = moment(this.dateRangeObj.startDate).format('YYYY-MM-DD');
    reconciliationHeaderSave.endPeriod = moment(this.dateRangeObj.endDate).format('YYYY-MM-DD');
    reconciliationHeaderSave.previousAmount = this.reconciliation.previousAmount;
    reconciliationHeaderSave.discrepancy = this.reconciliation.discrepancy;
    reconciliationHeaderSave.justification = this.reconciliation.justification;
    reconciliationHeaderSave.reconciliationPurchaseOrderDetail = [];
    reconciliationHeaderSave.createBy = this.currentUser.userName;

    this.listPurchaseOrderDetail.forEach(element => {
      reconciliationHeaderSave.reconciliationPurchaseOrderDetail.push({
        purchaseOrderHeaderId: element.purchaseOrderHeaderId,
        purchaseOrderDetailId: element.id
      });
    });

    const formData = new FormData();
    formData.append('reconciliationHeaderSave', JSON.stringify(reconciliationHeaderSave));

    this.spinner.show();
    this.reconciliationHeaderService.updateReconciliation(formData).subscribe(data => {
      this.alertMessageService.successMessage('Conciliación guardada correctamente.');
      this.router.navigate([this.pageRedirect]);
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  documentSelect(id, event) {

    if (event.target.files.length > 5) {
      this.alertMessageService.errorMessage('message');
      return;
    }
    let fileExtension = '';

    for (const file of event.target.files) {
      fileExtension = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        this.fileUpload.nativeElement.value = '';
        return;
      }
    }

    this.files = [];
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);
    }
  }

  rowDrop(event) {
    this.refresh = true;
  }

  dataBound(event) {
    this.loadedPurchaseOrder = true;
    if (this.refresh && this.loadedInvoive) {
      this.refreshRemarck();
      this.refresh = false;
    }
  }

  dataBoundInvoice(event) {
    this.loadedInvoive = true;
    if (this.loadedPurchaseOrder && this.loadedOneTime == false) {
      this.calculateInvoiceTotal();
      if (this.listInvoiceDetail.length > 0 && this.listInvoiceDetail.length > 0) {
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
        element.remarck = (numeral(this.listPurchaseOrderDetail[i].subTotal).format('$0,0.00') == numeral(element.subTotal).format('$0,0.00')) ? true : false;
      } else {
        element.remarck = false;
      }
      i++;
    });
    this.gridInvoices.refresh();
  }

  downloadDocumentPDF() {
    /*this.spinner.show();
    this.listDocuments.array.forEach(element => {
      if (this.InvoicePDFId == element.id) {
        this.supplierInvoiceDocumentService.downloadSupplierInvoiceDocument(element).subscribe(
          data => {
            const blob: any = new Blob([data], { type: 'application/octet-stream' });
            saveAs(blob, `${element.userName}`);
            this.spinner.hide();
          },
          error => {
            this.alertMessageService.errorMessage(error.message);
          });
      }
    });*/
  }



}
