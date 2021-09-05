import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertMessageService, SessionService, AuthorizationProcessService } from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { RequisitionsAuthorizerModalComponent } from '../requisitions-authorizer-modal/requisitions-authorizer-modal.component';
import { RequisitionsAuthorizerDetailModalComponent } from '../requisitions-authorizer-detail-modal/requisitions-authorizer-detail-modal.component';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, SelectionSettingsModel, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisitions-authorizer-list',
  templateUrl: './requisitions-authorizer-list.component.html',
  styleUrls: ['./requisitions-authorizer-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequisitionsAuthorizerListComponent implements OnInit {

  @ViewChild('gridRequisitions', { static: false })
  public gridRequisitions: GridComponent;

  public listRequisitions: any;
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
    this.listRequisitions = [];
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
      fileName: 'Lista de Autorización de Requisiciones.xlsx'
    };
    this.gridRequisitions.excelExport(excelExportProperties);
  }

  getAuthorizationProcess() {
    this.spinner.show();
    this.authorizationProcessService.getAuthorizations(ProcessType.Requisition, this.currentUser.userName,
      AuthorizationStatus.Pending).subscribe(
        data => {
          this.listRequisitions = data;
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
      html: `¿Desea <strong class="text-success">autorizar</strong> la requisición <br><strong> Folio: ${item.folio}</strong>?<br><br><br><div align="left"><label >Observaciones:</label></div>`,
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
      html: `¿Desea <strong class="text-danger">rechazar</strong> la requisición <br><strong> Folio: ${item.folio}</strong>?<br><br><br><div align="left"><label >Observaciones:</label></div>`,
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
    const modalRef = this.modalService.open(RequisitionsAuthorizerDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Requisición';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = item;
    modalRef.result.then((e) => {
      this.getAuthorizationProcess();
    });
  }

  openModalAuthorization(action: Action) {
    if (this.gridRequisitions.getSelectedRecords().length <= 0) {
      const message = 'Favor de seleccionar al menos una requisición';
      this.alertMessageService.warningMessage(message);
      return;
    }

    const modalRef = this.modalService.open(RequisitionsAuthorizerModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Procesar Requisiciones';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = this.gridRequisitions.getSelectedRecords();
    modalRef.result.then((e) => {
      this.getAuthorizationProcess();
    });
  }

  process(requisition, authorizationStatusId) {

    const requisitionSave: any = {};

    requisitionSave.processTypeId = ProcessType.Requisition;
    requisitionSave.authorizationStatusId = authorizationStatusId;
    requisitionSave.createBy = requisition.createBy;
    requisitionSave.observation = requisition.observation;
    requisitionSave.Detail = Array(requisition);

    console.log(requisitionSave);

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(requisitionSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Requisición Authorizada correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Requisición Rechazada correctamente.');
        }
        this.getAuthorizationProcess();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }
}
