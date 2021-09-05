import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessageService, PurchaseOrderHeaderService, SessionService } from '@app/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action, PurchaseOrderStatus } from '@app/core/enums';
import { ReconciliationDetailModalComponent } from '../reconciliation-detail-modal/reconciliation-detail-modal.component';
import Swal from 'sweetalert2';
import { InvoiceService } from '@app/core/services/invoice.service';
import { ReconciliationHeaderService } from '@app/core/services/reconciliation-header.service';

@Component({
  selector: 'app-reconciliation-list',
  templateUrl: './reconciliation-list.component.html',
  styleUrls: ['./reconciliation-list.component.scss']
})
export class ReconciliationListComponent implements OnInit {

  @ViewChild('gridInvoices', { static: false })
  public gridInvoices: GridComponent;

  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public listReconciliations: any;
  public currentUser: any;
  public reconciliationStatus = PurchaseOrderStatus;
  public actionForm = Action;

  constructor(
    private alertMessageService: AlertMessageService,
    private reconciliationHeaderService: ReconciliationHeaderService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private invoiceService: InvoiceService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.listReconciliations = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'id', header: 'Folio', width: 150 },
      { field: 'statusName', header: 'Estatus', width: 150 },
      /*{ field: 'businessUnitName', header: 'Unidad de Negocio', width: 250 },
      { field: 'costCenterName', header: 'Centro de Costos', width: 250 },*/
      { field: 'supplierName', header: 'Proveedor', width: 250 },
      /*{ field: 'subTotal', header: 'SubTotal', width: 150, format: '$0,0.00', align: 'right' },
      { field: 'taxes', header: 'Impuestos', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'total', header: 'Total', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'currencyCode', header: 'Moneda', width: 100 },*/
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 }
    ];
    this.getReconciliations();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Listado de Conciliaciones.xlsx'
    };
    this.gridInvoices.excelExport(excelExportProperties);
  }

  getReconciliations() {
    this.spinner.show();
    this.reconciliationHeaderService.getReconciliations(this.currentUser.userName).subscribe(
      data => {
        this.listReconciliations = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  confirmDelete(item) {
    console.log(item);
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea <strong class="text-danger">eliminar</strong> la conciliación <br><strong>${item.id}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteReconciliation(item.id, this.currentUser.userName);
      }
    });
  }

  deleteReconciliation(reconciliationId, deletedBy) {
    this.spinner.show();
    this.reconciliationHeaderService.deleteReconciliation(reconciliationId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Conciliación eliminada correctamente.');
        this.getReconciliations();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  confirmAuthorization(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea enviar a <strong class="text-success">autorizar</strong> la conciliación <br><strong>${item.id}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.sendAuthorization(item.id, this.currentUser.userName);
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
        this.getReconciliations();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(ReconciliationDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Conciliación';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getReconciliations();
    });
  }

  factura() {
    /*const documentDefinition =
      this.conciliationService.getDocumentDefinition(this.cols, this.listPurchaseOrderDetail,
        [], []);
    pdfMake.createPdf(documentDefinition).open();*/
  }

}
