import { Component, OnInit, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel, SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';
import Swal from 'sweetalert2';
import { AuthorizerPriceListModalComponent } from '../authorizer-price-list-modal/authorizer-price-list-modal.component';
import {
  AuthorizerPriceListDetailModalComponent
} from '../authorizer-price-list-detail-modal/authorizer-price-list-detail-modal.component';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, AuthorizationProcessService, SessionService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-authorizer-price-list-list',
  templateUrl: './authorizer-price-list-list.component.html',
  styleUrls: ['./authorizer-price-list-list.component.scss']
})
export class AuthorizerPriceListListComponent implements OnInit {

  @ViewChild('gridPriceList', { static: false })
  public gridPriceList: GridComponent;

  public listPriceList: any;
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
    this.listPriceList = [];
    this.authorizationStatusId = AuthorizationStatus.None;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.selectOptions = { persistSelection: true, type: 'Multiple', enableSimpleMultiRowSelection: true };
    this.editSettings = { allowDeleting: true };
    this.cols = [
      { field: 'id', header: 'Lista de Precio Id', width: 50, visible: false, isPrimaryKey: true },
      { field: 'folio', header: 'Nombre', width: 200 },
      { field: 'processTypeName', header: 'Tipo Proceso', width: 250 },
      { field: 'fullName', header: 'Autorizador', width: 250 },
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 }
    ];
    this.getAuthorizationPriceList();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Precios por Autorizar.xlsx'
    };
    this.gridPriceList.excelExport(excelExportProperties);
  }

  getAuthorizationPriceList() {
    this.spinner.show();
    this.authorizationProcessService.getAuthorizations(ProcessType.Prices, this.currentUser.userName,
      AuthorizationStatus.Pending).subscribe(
        data => {
          this.listPriceList = data;
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
      html: `¿Desea <strong class="text-success">autorizar</strong> la lista de precios <br><strong> Folio: ${item.folio}</strong>?<br><br><br><div align="left"><label >Observaciones:</label></div>`,
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
      html: `¿Desea <strong class="text-danger">rechazar</strong> la lista de precios <br><strong> Folio: ${item.folio}</strong>?<br><br><br><div align="left"><label >Observaciones:</label></div>`,
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
    const modalRef = this.modalService.open(AuthorizerPriceListDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Lista de Precios';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = item;
    modalRef.result.then((e) => {
      this.getAuthorizationPriceList();
    });
  }

  openModalAuthorization(action: Action) {
    if (this.gridPriceList.getSelectedRecords().length <= 0) {
      const message = 'Favor de seleccionar al menos una lista de precios';
      this.alertMessageService.warningMessage(message);
      return;
    }

    const modalRef = this.modalService.open(AuthorizerPriceListModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Procesar Lista de Precios';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = this.gridPriceList.getSelectedRecords();
    modalRef.result.then((e) => {
      this.getAuthorizationPriceList();
    });
  }

  process(priceList, authorizationStatusId) {

    const priceListSave: any = {};

    priceListSave.processTypeId = ProcessType.Prices;
    priceListSave.authorizationStatusId = authorizationStatusId;
    priceListSave.createBy = priceList.createBy;
    priceListSave.observation = priceList.observation;
    priceListSave.detail = Array(priceList);

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(priceListSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Lista de Precios Autorizada correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Lista de Precios Rechazada correctamente.');
        }
        this.getAuthorizationPriceList();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
