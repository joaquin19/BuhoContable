import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, AuthorizerService, SessionService } from '@app/core/services';
import { AuthorizersModalComponent } from '../authorizers-modal/authorizers-modal.component';
import { AuthorizersOrderModalComponent } from '../authorizers-order-modal/authorizers-order-modal.component';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authorizers-list',
  templateUrl: './authorizers-list.component.html',
  styleUrls: ['./authorizers-list.component.scss']
})
export class AuthorizersListComponent implements OnInit {

  @ViewChild('gridAuthorizers', { static: false })
  public gridAuthorizers: GridComponent;

  public listAuthorizers: any;
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
    private authorizerService: AuthorizerService,
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
    this.listAuthorizers = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'userName', header: 'Usuario', width: 150 },
      { field: 'fullName', header: 'Nombre', width: 250 },
      { field: 'processTypeName', header: 'Tipo Proceso', width: 200 },
      { field: 'sortOrder', header: 'Orden', width: 100 }
    ];

    this.getAuthorizers();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Autorizadores.xlsx'
    };
    this.gridAuthorizers.excelExport(excelExportProperties);
  }

  getAuthorizers() {
    this.spinner.show();
    this.authorizerService.getAuthorizers().subscribe(
      data => {
        this.listAuthorizers = data;
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
      html: `¿Desea eliminar el autorizador <strong>${item.fullName}</strong> del proceso <strong>${item.processTypeName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteAuthorizer(item.id, this.currentUser.userName);
      }
    });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(AuthorizersModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nuevo Autorizador';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Autorizador';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getAuthorizers();
    });
  }

  openOrderModal(action: Action, item: any) {
    const modalRef = this.modalService.open(AuthorizersOrderModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Editar Orden Autorizadores';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getAuthorizers();
    });
  }

  deleteAuthorizer(authorizerSave, deletedBy) {
    this.spinner.show();
    this.authorizerService.deleteAuthorizer(authorizerSave, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Autorizador eliminado correctamente.');
        this.getAuthorizers();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
