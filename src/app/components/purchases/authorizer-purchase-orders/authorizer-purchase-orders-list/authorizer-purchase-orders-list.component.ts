import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertMessageService, SessionService, AuthorizationProcessService } from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { AuthorizerPurchaseOrdersModalComponent } from '../authorizer-purchase-orders-modal/authorizer-purchase-orders-modal.component';
import { AuthorizerPurchaseOrdersDetailModalComponent } from '../authorizer-purchase-orders-detail-modal/authorizer-purchase-orders-detail-modal.component';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, SelectionSettingsModel, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authorizer-purchase-orders-list',
  templateUrl: './authorizer-purchase-orders-list.component.html',
  styleUrls: ['./authorizer-purchase-orders-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorizerPurchaseOrdersListComponent implements OnInit {

  @ViewChild('gridPurchaseOrders', { static: false })
  public gridPurchaseOrders: GridComponent;

  public listPurchaseOrders: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: SelectionSettingsModel;
  public actionForm = Action;
  public currentUser: any;
  public selectionSettings: any;
  public editSettings: any;
  public authorizationStatusId: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private authorizationProcessService: AuthorizationProcessService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.cols = [];
    this.listPurchaseOrders = [];
    this.authorizationStatusId = AuthorizationStatus.None;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.selectOptions = { persistSelection: true, type: 'Multiple', enableSimpleMultiRowSelection: true };
    this.editSettings = { allowDeleting: true };
    this.cols = [
      { field: 'id', header: 'Orden Compra Id', width: 50, visible: false, isPrimaryKey: true },
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'processTypeName', header: 'Tipo Proceso', width: 250 },
      { field: 'subTotal', header: 'Sub Total', width: 150, format: '$0,0.00' },
      { field: 'taxes', header: 'Impuestos', width: 150, format: '$0,0.00', align: 'right' },
      { field: 'total', header: 'Total', width: 150, format: '$0,0.00' },
      { field: 'fullName', header: 'Autorizador', width: 250 },
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 }
    ];
    this.getAuthorizationProcess();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista Órdenes de Compra por Autorizar.xlsx'
    };
    this.gridPurchaseOrders.excelExport(excelExportProperties);
  }

  getAuthorizationProcess() {
    this.spinner.show();
    this.authorizationProcessService.getAuthorizations(ProcessType.PurchaseOrder, this.currentUser.userName,
      AuthorizationStatus.Pending).subscribe(
        data => {
          this.listPurchaseOrders = data;
          this.spinner.hide();
        },
        error => {
          this.alertMessageService.errorMessage(error.message);
          this.spinner.hide();
        });
  }

  confirmAuthorize(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea <strong class="text-success">autorizar</strong> la orden de compra <br><strong> Folio: ${item.folio}</strong>?<br><br><br><div align="left"><label >Observaciones:</label></div>`,
      icon: 'warning',
      input: 'textarea',
      inputPlaceholder: 'Observaciones...',
      inputAttributes: {
        'aria-label': 'Observaciones',
        maxlength: '200'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        item.observation = result.value;
      }
      if (result.isConfirmed) {
        elem.process(item, AuthorizationStatus.Authorized);
      }
    });
  }

  confirmReject(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea <strong class="text-danger">rechazar</strong> la orden de compra <br><strong> Folio: ${item.folio}</strong>?<br><br><br><div align="left"><label >Observaciones:</label></div>`,
      icon: 'warning',
      input: 'textarea',
      inputPlaceholder: 'Observaciones...',
      inputAttributes: {
        'aria-label': 'Observaciones',
        maxlength: '200'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Favor de ingresar una observación de rechazo';
        }
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        item.observation = result.value;
      }
      if (result.isConfirmed) {
        elem.process(item, AuthorizationStatus.Rejected);
      }
    });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(AuthorizerPurchaseOrdersDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Orden de Compra';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = item;
    modalRef.result.then((e) => {
      this.getAuthorizationProcess();
    });
  }

  openModalAuthorization(action: Action) {
    if (this.gridPurchaseOrders.getSelectedRecords().length <= 0) {
      const message = 'Favor de seleccionar al menos una orden de compra';
      this.alertMessageService.warningMessage(message);
      return;
    }

    const modalRef = this.modalService.open(AuthorizerPurchaseOrdersModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Procesar Órdenes de Compra';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = this.gridPurchaseOrders.getSelectedRecords();
    modalRef.result.then((e) => {
      this.getAuthorizationProcess();
    });
  }

  process(purchaseOrder, authorizationStatusId) {

    const purchaseOrderSave: any = {};

    purchaseOrderSave.processTypeId = ProcessType.PurchaseOrder;
    purchaseOrderSave.authorizationStatusId = authorizationStatusId;
    purchaseOrderSave.createBy = purchaseOrder.createBy;
    purchaseOrderSave.observation = purchaseOrder.observation;
    purchaseOrderSave.detail = Array(purchaseOrder);

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(purchaseOrderSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Orden de Compra Authorizada correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Orden de Compra Rechazada correctamente.');
        }
        this.getAuthorizationProcess();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
