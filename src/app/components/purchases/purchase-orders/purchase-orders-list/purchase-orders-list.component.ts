import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action, PurchaseOrderStatus } from '@app/core/enums';
import { AlertMessageService, PurchaseOrderHeaderService, SessionService } from '@app/core/services';
import { PurchaseOrdersDetailModalComponent } from '../purchase-orders-detail-modal/purchase-orders-detail-modal.component';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.scss']
})
export class PurchaseOrdersListComponent implements OnInit {

  @ViewChild('gridPurchaseOrders', { static: false })
  public gridPurchaseOrders: GridComponent;

  public listPurchaseOrders: any;
  public listPurchaseOrdersCreated: any;
  public listPurchaseOrdersPendingAuthorize: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;
  public purchaseOrderStatus = PurchaseOrderStatus;
  public actionForm = Action;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.listPurchaseOrders = [];
    this.listPurchaseOrdersCreated = [];
    this.listPurchaseOrdersPendingAuthorize = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'plantName', header: 'Planta', width: 100 },
      { field: 'statusNameName', header: 'Estatus', width: 150 },
      { field: 'businessUnitName', header: 'Unidad de Negocio', width: 250 },
      { field: 'costCenterName', header: 'Centro de Costos', width: 250 },
      { field: 'costTypeName', header: 'Costo', width: 150 },
      { field: 'supplierName', header: 'Proveedor', width: 250 },
      { field: 'detail', header: 'Detalle', width: 120 },
      { field: 'subTotal', header: 'SubTotal', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'iva', header: 'IVA', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'retentionISR', header: 'Retención ISR', width: 150, format: '$0,0.00', textAlign: 'right' },
      /*{ field: 'taxes', header: 'Impuestos', width: 150, format: '$0,0.00', textAlign: 'right' },*/
      { field: 'total', header: 'Total', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'currencyCode', header: 'Moneda', width: 100 },
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 }
    ];
    this.getPurchaseOrders();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista Órdenes de Compra.xlsx'
    };
    this.gridPurchaseOrders.excelExport(excelExportProperties);
  }

  getPurchaseOrders() {
    this.spinner.show();
    this.purchaseOrderHeaderService.getPurchaseOrders(this.currentUser.userName).subscribe(
      data => {
        this.listPurchaseOrders = data;
        this.listPurchaseOrdersCreated = this.listPurchaseOrders
          .filter(o => o.statusId === this.purchaseOrderStatus.Created);
        this.listPurchaseOrdersPendingAuthorize = this.listPurchaseOrders
          .filter(o => o.statusId === this.purchaseOrderStatus.PendingAuthorize);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  setPurchaseOrders(data) {
    const purchaseOrder: any = [];
    data.forEach(element => {
      purchaseOrder.push({
      });
    });
    return purchaseOrder;
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea <strong class="text-danger">eliminar</strong> la orden de compra <br><strong>${item.folio}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deletePurchaseOrder(item.id, this.currentUser.userName);
      }
    });
  }

  deletePurchaseOrder(purchaseOrderId, deletedBy) {
    this.spinner.show();
    this.purchaseOrderHeaderService.deletePurchaseOrder(purchaseOrderId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Orden de Compra eliminada correctamente.');
        this.getPurchaseOrders();
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
      html: `¿Desea enviar a <strong class="text-success">autorizar</strong> la orden de compra <br><strong>${item.folio}</strong>?`,
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
    const purchaseOrderSave: any = {};
    purchaseOrderSave.id = id;
    purchaseOrderSave.createBy = userName;

    this.spinner.show();
    this.purchaseOrderHeaderService.updatePurchaseOrderSendAuthorization(purchaseOrderSave).subscribe(
      data => {
        this.alertMessageService.successMessage('Orden de compra enviada a autorizar correctamente.');
        this.getPurchaseOrders();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(PurchaseOrdersDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Orden de Compra';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getPurchaseOrders();
    });
  }

}
