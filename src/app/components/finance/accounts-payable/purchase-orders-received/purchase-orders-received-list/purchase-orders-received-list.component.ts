import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { AccountPayableService, AlertMessageService, SessionService } from '@app/core/services';
import { PurchaseOrdersReceivedModalComponent } from '../purchase-orders-received-modal/purchase-orders-received-modal.component';
import {
  PurchaseOrdersReceivedEditionModalComponent
} from '../purchase-orders-received-edition-modal/purchase-orders-received-edition-modal.component';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-purchase-orders-received-list',
  templateUrl: './purchase-orders-received-list.component.html',
  styleUrls: ['./purchase-orders-received-list.component.scss']
})
export class PurchaseOrdersReceivedListComponent implements OnInit {

  @ViewChild('gridPurchaseOrdersReceived', { static: false })
  public gridPurchaseOrdersReceived: GridComponent;

  public listPurchaseOrdersReceived: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public actionForm = Action;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;
  public authorizationStatus: AuthorizationStatus;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private accountPayableService: AccountPayableService,
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
    this.listPurchaseOrdersReceived = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'id', header: 'Orden Compra Id', width: 50, visible: false, isPrimaryKey: true },
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'accountPayableStatusName', header: 'Estatus', width: 150 },
      { field: 'costCenterName', header: 'Centro de Costos', width: 250 },
      { field: 'businessUnitName', header: 'Unidad de Negocio', width: 250 },
      { field: 'subTotal', header: 'Sub Total', width: 150, format: '$0,0.00' },
      { field: 'taxes', header: 'Impuestos', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'total', header: 'Total', width: 150, format: '$0,0.00' },
      { field: 'supplierName', header: 'Proveedor', width: 150 },
      { field: 'createBy', header: 'Autorizado Por', width: 200 },
      { field: 'createdOn', header: 'Fecha Autorización', width: 160 }
    ];
    this.getPurchaseOrders();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista Ordenes de Compra.xlsx'
    };
    this.gridPurchaseOrdersReceived.excelExport(excelExportProperties);
  }

  getPurchaseOrders() {
    this.spinner.show();
    this.accountPayableService.getAuthorizedPurchaseOrders(this.currentUser.userName, AuthorizationStatus.Authorized).subscribe(
      data => {
        this.listPurchaseOrdersReceived = data;
        console.log(this.listPurchaseOrdersReceived);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(PurchaseOrdersReceivedModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.ReadOnly:
        modalRef.componentInstance.title = 'Detalle Orden de Compra';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getPurchaseOrders();
    });
  }


  openModalEdit(action: Action, item: any) {
    const modalRef = this.modalService.open(PurchaseOrdersReceivedEditionModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Estatus de Cuenta por Pagar';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getPurchaseOrders();
    });
  }

}
