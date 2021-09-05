import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, MerchandiseReceptionHeaderService, SessionService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-merchandise-reception-list',
  templateUrl: './merchandise-reception-list.component.html',
  styleUrls: ['./merchandise-reception-list.component.scss']
})
export class MerchandiseReceptionListComponent implements OnInit {

  @ViewChild('gridMerchandise', { static: false })
  public gridMerchandise: GridComponent;

  public listMerchandise: any;
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
    private merchandiseReceptionHeaderService: MerchandiseReceptionHeaderService,
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
    this.listMerchandise = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'folio', header: 'Folio Orden de Compra', width: 100 },
      { field: 'statusId', header: 'Status', width: 150, visible: false },
      { field: 'statusName', header: 'Estatus', width: 100 },
      { field: 'receptionDate', header: 'Fecha Recepción', width: 100 }
    ];

    this.getMerchandise();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Recepción de Mercancía.xlsx'
    };
    this.gridMerchandise.excelExport(excelExportProperties);
  }

  getMerchandise() {
    this.spinner.show();
    this.merchandiseReceptionHeaderService.getMerchandiseReceptions().subscribe(
      data => {
        this.listMerchandise = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.spinner.hide();
      });
  }
}
