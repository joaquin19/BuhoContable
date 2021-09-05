import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, ProfileSystemService, SessionService } from '@app/core/services';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, SelectionService, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss'],
  providers: [SelectionService]
})
export class ProfilesListComponent implements OnInit {

  @ViewChild('gridProfiles', { static: false })
  public gridProfiles: GridComponent;

  public listProfiles: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private profileSystemService: ProfileSystemService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.listProfiles = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'name', header: 'Nombre', width: 200 },
      { field: 'description', header: 'Descripción', width: 350 }
    ];

    this.getProfilesSystem();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Perfiles.xlsx'
    };
    this.gridProfiles.excelExport(excelExportProperties);
  }

  getProfilesSystem() {
    this.spinner.show();
    this.profileSystemService.getProfilesSystem().subscribe(
      data => {
        this.listProfiles = data;
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
      html: `¿Desea eliminar el perfil <strong>${item.name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteProfileSystem(item.id, this.currentUser.userName);
      }
    });
  }

  deleteProfileSystem(profileSystemId, deletedBy) {
    this.spinner.show();
    this.profileSystemService.deleteProfileSystem(profileSystemId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Perfil eliminado correctamente.');
        this.getProfilesSystem();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
