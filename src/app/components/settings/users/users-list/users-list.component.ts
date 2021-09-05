import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, UserSystemService, SessionService } from '@app/core/services';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, SelectionService, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersModalComponent } from '../users-modal/users-modal.component';
import { Action } from '@app/core/enums';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [SelectionService]
})
export class UsersListComponent implements OnInit {

  @ViewChild('gridUsers', { static: false })
  public gridUsers: GridComponent;

  public listUsers: any;
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
    private userSystemService: UserSystemService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.itemsPage = projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.listUsers = [];
    this.cols = [];

  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'fullName', header: 'Nombre', width: 250 },
      { field: 'email', header: 'Correo', width: 200 },
      { field: 'userName', header: 'Usuario', width: 200 },
      { field: 'profileName', header: 'Perfil', width: 150 },
    ];

    this.getUsersSystem();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Usuarios.xlsx'
    };
    this.gridUsers.excelExport(excelExportProperties);
  }

  getUsersSystem() {
    this.spinner.show();
    this.userSystemService.getUsersSystem().subscribe(
      data => {
        this.listUsers = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(UsersModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nuevo Usuario';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Usuario';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getUsersSystem();
    });
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar el usuario <strong>${item.fullName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteUserSystem(item.id, this.currentUser.userName);
      }
    });
  }

  deleteUserSystem(userSystemId, deletedBy) {
    this.spinner.show();
    this.userSystemService.deleteUserSystem(userSystemId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Usuario eliminado correctamente.');
        this.getUsersSystem();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
