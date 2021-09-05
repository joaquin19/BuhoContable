import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action, RequisitionStatus } from '@app/core/enums';
import { AlertMessageService, RequisitionHeaderService, SessionService } from '@app/core/services';
import { RequisitionsDetailModalComponent } from '../requisitions-detail-modal/requisitions-detail-modal.component';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisitions-list',
  templateUrl: './requisitions-list.component.html',
  styleUrls: ['./requisitions-list.component.scss']
})
export class RequisitionsListComponent implements OnInit {

  @ViewChild('gridRequisitions', { static: false })
  public gridRequisitions: GridComponent;

  public listRequisitions: any;
  public listRequisitionsCreated: any;
  public listRequisitionsPendingAuthorize: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;
  public requisitionStatus = RequisitionStatus;
  public actionForm = Action;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private requisitionHeaderService: RequisitionHeaderService,
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
    this.listRequisitions = [];
    this.listRequisitionsCreated = [];
    this.listRequisitionsPendingAuthorize = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'statusNameName', header: 'Estatus', width: 150 },
      { field: 'businessUnitName', header: 'Unidad de Negocio', width: 250 },
      { field: 'costCenterName', header: 'Centro de Costos', width: 250 },
      { field: 'supplierName', header: 'Proveedor', width: 250 },
      { field: 'subTotal', header: 'SubTotal', width: 150, format: '$0,0.00' },
      { field: 'taxes', header: 'Impuestos', width: 150, format: '$0,0.00', textAlign: 'right' },
      { field: 'total', header: 'Total', width: 150, format: '$0,0.00' },
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 }
    ];

    this.getRequisitions();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Requisiciones.xlsx'
    };
    this.gridRequisitions.excelExport(excelExportProperties);
  }

  getRequisitions() {
    this.spinner.show();
    this.requisitionHeaderService.getRequisitions(this.currentUser.userName).subscribe(
      data => {
        this.listRequisitions = data;
        this.listRequisitionsCreated = this.listRequisitions
          .filter(o => o.statusId === this.requisitionStatus.Created);
        this.listRequisitionsPendingAuthorize = this.listRequisitions
          .filter(o => o.statusId === this.requisitionStatus.PendingAuthorize);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  setRequisitions(data) {
    const requisitions: any = [];
    data.forEach(element => {
      requisitions.push({
      });
    });
    return requisitions;
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea <strong class="text-danger">eliminar</strong> la requisición <br><strong>${item.folio}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteRequisition(item.id, this.currentUser.userName);
      }
    });
  }

  deleteRequisition(requisitionId, deletedBy) {
    this.spinner.show();
    this.requisitionHeaderService.deleteRequisition(requisitionId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Requisición eliminada correctamente.');
        this.getRequisitions();
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
      html: `¿Desea enviar a <strong class="text-success">autorizar</strong> la requisición <br><strong>${item.folio}</strong>?`,
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
    const requisitionSave: any = {};
    requisitionSave.id = id;
    requisitionSave.createBy = userName;

    this.spinner.show();
    this.requisitionHeaderService.updateRequisitionSendAuthorization(requisitionSave).subscribe(
      data => {
        this.alertMessageService.successMessage('Requisición enviada a autorizar correctamente.');
        this.getRequisitions();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(RequisitionsDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Requisición';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getRequisitions();
    });
  }

}

