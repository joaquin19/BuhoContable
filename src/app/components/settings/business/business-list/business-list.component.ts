import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, SessionService } from '@app/core/services';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  @ViewChild('gridEmpresas', { static: false })
  public gridEmpresas: GridComponent;

  public listBusiness: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public currentUser: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    // private profileSystemService: ProfileSystemService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.listBusiness = [
      { id: 1, name: 'KRAEM SA de CV',
      description: 'empresa de giro automotriz',
      status: 'Activo' },
      { id: 2, name: 'KRAEM SA de CV',
      description: 'empresa de giro automotriz',
      status: 'Activo' },
      { id: 3, name: 'KRAEM SA de CV',
      description: 'empresa de giro automotriz',
      status: 'Activo' },
      { id: 4, name: 'KRAEM SA de CV',
      description: 'empresa de giro automotriz',
      status: 'Activo' },
      { id: 5, name: 'KRAEM SA de CV',
      description: 'empresa de giro automotriz',
      status: 'Activo' },
      { id: 6, name: 'KRAEM SA de CV',
      description: 'empresa de giro automotriz',
      status: 'Activo' }
    ];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.getBusiness();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Empresas.xlsx'
    };
    this.gridEmpresas.excelExport(excelExportProperties);
  }

  getBusiness() {
    // this.spinner.show();
    // this.profileSystemService.getProfilesSystem().subscribe(
    //   data => {
    //     this.listBusiness = data;
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.alertMessageService.errorMessage(error.message);
    //   });
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar la empresa <strong>${item.name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteBusinesss(item.id, this.currentUser.userName);
      }
    });
  }

  deleteBusinesss(profileSystemId, deletedBy) {
    // this.spinner.show();
    // this.profileSystemService.deleteBusinesss(profileSystemId, deletedBy).subscribe(
    //   data => {
    //     this.alertMessageService.successMessage('Perfil eliminado correctamente.');
    //     this.getProfilesSystem();
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.alertMessageService.errorMessage(error.message);
    //   });
  }

}
