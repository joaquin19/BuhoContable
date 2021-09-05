import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, SessionService } from '@app/core/services';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Action } from '@app/core/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExchangeRateModalComponent } from '../exchange-rate-modal/exchange-rate-modal.component';
import { ExchangeRateService } from '@app/core/services/exchange-rate.service';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.scss']
})
export class ExchangeRateListComponent implements OnInit {

  @ViewChild('gridExchangeRate', { static: false })
  public gridExchangeRate: GridComponent;

  public listExchangeRates: any;
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
    private exchangeRateService: ExchangeRateService,
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
    this.listExchangeRates = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'exchangeRateValue', header: 'Tipo de Cambio', width: 150, format: '$0,0.0000' },
      { field: 'changeDay', header: 'Día de Cambio', width: 200 }
    ];
    this.getExchangeRates();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogo de Artículos.xlsx'
    };
    this.gridExchangeRate.excelExport(excelExportProperties);
  }

  getExchangeRates() {
    this.spinner.show();
    this.exchangeRateService.getExchangeRates().subscribe(
      data => {
        this.listExchangeRates = data;
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
      html: `¿Desea eliminar el tipo de cambio <strong>${item.exchangeRate}</strong> del día <strong>${item.exchangeDay}</strong>?`,
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
    const modalRef = this.modalService.open(ExchangeRateModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Agregar Tipo de Cambio';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Tipo de Cambio';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getExchangeRates();
    });
  }

  deleteArticle(articleSave, deletedBy) {
    this.spinner.show();
    this.exchangeRateService.deleteExchangeRate(articleSave, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Tipo de cambio eliminado correctamente.');
        this.getExchangeRates();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
