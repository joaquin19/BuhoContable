import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { ImportPedimentsModalComponent } from '../import-pediments-modal/import-pediments-modal.component';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import-pediments-list',
  templateUrl: './import-pediments-list.component.html',
  styleUrls: ['./import-pediments-list.component.scss']
})
export class ImportPedimentsListComponent implements OnInit {

  @ViewChild('gridImportPediments', { static: false })
  public gridImportPediments: GridComponent;

  public listImportPediments: any;
  public listDocumentTypes: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;
  public actionForm = Action;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
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
    this.listImportPediments = [];
    this.listDocumentTypes = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'id', header: 'Orden Compra Id', width: 50, visible: false, isPrimaryKey: true },
      { field: 'pedimentNumber', header: 'No Pedimento', width: 200 },
      { field: 'customerReference', header: 'Referencia del Cliente', width: 200 },
      { field: 'pedimentDate', header: 'Fecha Pedimento', width: 200 },
      { field: 'subTotal', header: 'Sub Total', width: 150, format: '$0,0.0000' },
      { field: 'total', header: 'Total', width: 150, format: '$0,0.0000' }
    ];
    this.getImportPediments();
  }

  getImportPediments() {
    this.spinner.show();
    setTimeout(() => {
      this.listImportPediments = [
        {
          id: 1,
          pedimentNumber: '12345',
          customerReference: 'VLC-12345',
          pedimentDate: '14-05-2020',
          subTotal: 14000,
          total: 15000
        },
        {
          id: 2,
          pedimentNumber: '54321',
          customerReference: 'VLC-54321',
          pedimentDate: '25-06-2020',
          subTotal: 20000,
          total: 25000
        },
        {
          id: 3,
          pedimentNumber: '98745',
          customerReference: 'VLC-98745',
          pedimentDate: '08-09-2020',
          subTotal: 12000,
          total: 17000
        }
      ];
      this.getDocumentTypes();
      this.spinner.hide();
    }, 500);
  }

  getDocumentTypes() {
    this.spinner.show();
    setTimeout(() => {
      this.listDocumentTypes = [
        { id: 1, description: 'Factura' },
        { id: 5, description: 'Pedimento' },
        { id: 8, description: 'Lista de empaque' },
        { id: 10, description: 'Ficha técnica' },
        { id: 11, description: 'Cuenta de gastos' },
        { id: 12, description: 'Hoja de calculo' },
        { id: 13, description: 'Manifestación de valor' },
        { id: 123, description: 'Archivo de pago pedimento' },
        { id: 129, description: 'Archivo XML Cove' },
        { id: 1144, description: 'Carta 3.1.8' },
        { id: 1148, description: 'BL' },
        { id: 1185, description: 'Cartas incrementables' },
        { id: 1209, description: 'Pruebas de valor' },
        { id: 1215, description: 'Carta dueño beneficiario' },
        { id: 1233, description: 'Acuse recep mcia en destino' },
        { id: 1242, description: 'Documento de operación para despacho aduanero' },
        { id: 1255, description: 'Reporte de previo' }
      ];
      this.spinner.hide();
    }, 500);
  }

  filteringDocumentTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('description', 'contains', e.text, true, true) : query;
    e.updateData(this.listDocumentTypes, query);
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista Pedimentos.xlsx'
    };
    this.gridImportPediments.excelExport(excelExportProperties);
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(ImportPedimentsModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Agregar Pedimento';
        break;
      case Action.ReadOnly:
        modalRef.componentInstance.title = 'Detalle de Pedimento';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      // this.getPurchaseOrders();
    });
  }

}
