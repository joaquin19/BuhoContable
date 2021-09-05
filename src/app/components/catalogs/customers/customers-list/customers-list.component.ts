import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertMessageService, SessionService } from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { Action } from '@app/core/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomersDetailModalComponent } from '../customers-detail-modal/customers-detail-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  @ViewChild('gridCustomers', { static: false })
  public gridCustomers: GridComponent;

  public listCustomers: any;
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
    private customerService: CustomerService,
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
    this.listCustomers = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'id', header: 'No. Cliente', width: 100 },
      { field: 'name', header: 'Cliente', width: 250 },
      { field: 'customerTypeName', header: 'Tipo Cliente', width: 150 },
      { field: 'rfcId', header: 'RFC', width: 150 }
    ];

    this.getCustomers();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogo de Clientes.xlsx'
    };
    this.gridCustomers.excelExport(excelExportProperties);
  }

  getCustomers() {
    this.spinner.show();
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(CustomersDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false,
      });

    modalRef.componentInstance.title = 'Detalle de Cliente';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.items = item;
    modalRef.result.then((e) => {

    });
  }

}
