import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, ArticleService, SessionService } from '@app/core/services';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Action } from '@app/core/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesModalComponent } from '../articles-modal/articles-modal.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  @ViewChild('gridArticles', { static: false })
  public gridArticles: GridComponent;

  public listArticles: any;
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
    private articleService: ArticleService,
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
    this.listArticles = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'code', header: 'Código', width: 150 },
      { field: 'name', header: 'Nombre', width: 250 },
      { field: 'description', header: 'Descripción', width: 350 },
      { field: 'articleTypeName', header: 'Tipo Artículo', width: 150 },
      { field: 'unitPrice', header: 'Precio Unitario', width: 150, format: '$0,0.0000' },
      { field: 'unitMeasureName', header: 'Unidad de Medida', width: 200 },
      { field: 'dimension', header: 'Dimensión', width: 150 }
    ];
    this.getArticles();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogo de Artículos.xlsx'
    };
    this.gridArticles.excelExport(excelExportProperties);
  }

  getArticles() {
    this.spinner.show();
    this.articleService.getArticles().subscribe(
      data => {
        this.listArticles = data;
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
      html: `¿Desea eliminar el artículo <strong>${item.name}</strong>?`,
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
    const modalRef = this.modalService.open(ArticlesModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nuevo Artículo';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Artículo';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getArticles();
    });
  }

  deleteArticle(articleSave, deletedBy) {
    this.spinner.show();
    this.articleService.deleteArticle(articleSave, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Artículo eliminado correctamente.');
        this.getArticles();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
