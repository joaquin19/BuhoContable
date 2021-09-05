import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { PreInvoiceStatus } from '../../../../core/enums/pre-invoice';
import { PreInvoiceDetailModalComponent } from '../pre-invoice-detail-modal/pre-invoice-detail-modal.component';
import { PreInvoiceService } from '../../../../core/services/pre-invoice.service';

@Component({
  selector: 'app-pre-invoice-list',
  templateUrl: './pre-invoice-list.component.html',
  styleUrls: ['./pre-invoice-list.component.scss']
})
export class PreInvoiceListComponent implements OnInit {

  @ViewChild('gridPreInvoice', { static: false })
  public gridPreInvoice: GridComponent;

  public preInvoice: any;
  public cols: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public currentUser: any;
  public actionForm = Action;
  public preInvoiceStatus = PreInvoiceStatus;

  constructor(
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private alertMessageService: AlertMessageService,
    private preInvoiceService: PreInvoiceService,
    private modalService: NgbModal
  ) {
    this.preInvoice = [];
    this.cols = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'noControl', header: 'No. Control', width: 250 },
      { field: 'customerName', header: 'Cliente', width: 250 },
      { field: 'createdOn', header: 'Fecha de Creación', width: 200 },
      { field: 'deliveryDate', header: 'Fecha de Entrega', width: 150 },
      { field: 'totalPrice', header: 'Precio Total', width: 200 },
      { field: 'preInvoiceStatusName', header: 'Estatus', width: 150, textAlign: 'right' }
    ];
    this.getPreInvoice();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Pre-Facturas.xlsx'
    };
    this.gridPreInvoice.excelExport(excelExportProperties);
  }

  getPreInvoice() {
    this.spinner.show();
    this.preInvoiceService.getPreInvoice(this.currentUser.userName).subscribe(
      data => {
        this.preInvoice = data;
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
      html: `¿Desea enviar a <strong class="text-success">autorizar</strong> la lista de precios <br><strong>${item.name}</strong>?`,
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
    const preInvvoiceSave: any = {};
    preInvvoiceSave.id = id;
    preInvvoiceSave.createBy = userName;

    this.spinner.show();
    this.preInvoiceService.updatePreInvoiceSendAuthorization(preInvvoiceSave).subscribe(
      data => {
        this.alertMessageService.successMessage('Lista de Pre-Facturas enviada a autorizar correctamente.');
        this.getPreInvoice();
        this.spinner.hide();
      },
      error => {
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
      html: `¿Desea <strong class="text-danger">eliminar</strong> la lista de Pre-Facturas <br><strong>${item.name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deletePreInvoice(item.id, this.currentUser.userName);
      }
    });
  }

  deletePreInvoice(preInvoiceId, deletedBy) {
    this.spinner.show();
    this.preInvoiceService.deletePreInvoice(preInvoiceId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Lista de Precios eliminada correctamente.');
        this.getPreInvoice();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(PreInvoiceDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Lista de Precios';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getPreInvoice();
    });
  }

}
