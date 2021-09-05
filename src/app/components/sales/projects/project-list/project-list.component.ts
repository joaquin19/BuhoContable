import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService, ProjectsService } from '@app/core/services';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @ViewChild('gridProjects', { static: false })
  public gridProjects: GridComponent;

  public listProjects: any;
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
    private projectsService: ProjectsService,
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
    this.listProjects = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'name', header: 'Proyecto', width: 200 },
      { field: 'startDate', header: 'Feha Inicio Vigencia', width: 200 },
      { field: 'endDate', header: 'Feha Final Vigencia', width: 200 }
    ];
    this.getProjects();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogo de Proyectos.xlsx'
    };
    this.gridProjects.excelExport(excelExportProperties);
  }

  getProjects() {
    this.spinner.show();
    this.projectsService.getProjects().subscribe(
      data => {
        data.map(project => (
          project.startDate = moment(project.startDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'),
          project.endDate = moment(project.endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')
        ));
        this.listProjects = data;
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
      html: `¿Desea eliminar el Proyecto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteArticle(item.id, this.currentUser.userName);
      }
    });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(ProjectModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Agregar Proyecto';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Proyecto';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getProjects();
    });
  }

  deleteArticle(projectSave, deletedBy) {
    this.spinner.show();
    this.projectsService.deleteProjects(projectSave, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Proyecto eliminado correctamente.');
        this.getProjects();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }


}
