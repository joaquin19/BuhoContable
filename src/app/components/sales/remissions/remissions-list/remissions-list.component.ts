import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { Action } from '@app/core/enums';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, SessionService, OrderHeaderService } from '@app/core/services';
import { RemissionsDetailModalComponent } from '../remissions-detail-modal/remissions-detail-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remissions-list',
  templateUrl: './remissions-list.component.html',
  styleUrls: ['./remissions-list.component.scss']
})
export class RemissionsListComponent implements OnInit {

  @ViewChild('gridRemissions', { static: false })
  public gridRemissions: GridComponent;

  public listRemissions: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public actionForm = Action;
  public currentUser: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private orderHeaderService: OrderHeaderService,
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
    this.listRemissions = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'noOrder', header: 'No. Orden', width: 200 },
      { field: 'noOrderCustomer', header: 'No. Orden Cliente', width: 200 },
      { field: 'shippingAddress', header: 'Enviar A', width: 250 },
      { field: 'shippingDate', header: 'Fecha de Entrega', width: 200 },
      { field: 'orderStatusName', header: 'Estatus', width: 150, textAlign: 'right' },
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 }
    ];

    this.getOrders();
  }

  getOrders() {
    this.spinner.show();
    this.orderHeaderService.getOrders(this.currentUser.userName).subscribe(
      data => {
        data.map(order => (
          order.shippingDate = moment(order.shippingDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')
        ));
        this.listRemissions = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Remisiones.xlsx'
    };
    this.gridRemissions.excelExport(excelExportProperties);
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar la remisión <strong>${item.folio}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteOrder(item.id, this.currentUser.userName);
      }
    });
  }

  deleteOrder(remissionSave, deletedBy) {
    this.spinner.show();
    this.orderHeaderService.deleteOrder(remissionSave, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Remisión eliminada correctamente.');
        this.getOrders();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(RemissionsDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Remisión';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getOrders();
    });
  }

}
