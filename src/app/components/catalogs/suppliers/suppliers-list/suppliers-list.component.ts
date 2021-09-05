import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessageService, SupplierService, SessionService } from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, SelectionService, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { Action } from '@app/core/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuppliersDetailModalComponent } from '../suppliers-detail-modal/suppliers-detail-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss'],
  providers: [SelectionService]
})
export class SuppliersListComponent implements OnInit {

  @ViewChild('gridSuppliers', { static: false })
  public gridSuppliers: GridComponent;

  public listSuppliers: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public actionForm = Action;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private supplierService: SupplierService,
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
    this.listSuppliers = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'id', header: 'No. Proveedor', width: 100 },
      { field: 'name', header: 'Proveedor', width: 250 },
      { field: 'supplierTypeName', header: 'Tipo Proveedor', width: 150 },
      { field: 'rfcId', header: 'RFC', width: 150 }
    ];

    this.getSuppliers();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogode Proveedores.xlsx'
    };
    this.gridSuppliers.excelExport(excelExportProperties);
  }

  getSuppliers() {
    this.spinner.show();
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.listSuppliers = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(SuppliersDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Proveedor';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = item;
    modalRef.result.then((e) => {

    });
  }

}
