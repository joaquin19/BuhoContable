import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { SaleSupportHeaderService } from '@app/core/services/sale-support-header.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { SalesSupportDetailModalComponent } from '../sales-support-detail-modal/sales-support-detail-modal.component';
import { SalesSupportFormComponent } from '../sales-support-form/sales-support-form.component';

@Component({
  selector: 'app-sales-support-list',
  templateUrl: './sales-support-list.component.html',
  styleUrls: ['./sales-support-list.component.scss']
})
export class SalesSupportListComponent implements OnInit {

  @ViewChild('gridSalesSupport', { static: false })
  public gridSalesSupport: GridComponent;

  public listSalesSupport: any;
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
    private saleSupportHeaderService: SaleSupportHeaderService,
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
    this.listSalesSupport = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'createdOn', header: 'Fecha Creación', width: 160 },
      { field: 'customerName', header: 'Cliente', width: 250 },
      { field: 'createBy', header: 'Creado Por', width: 180 },
      { field: 'total', header: 'Precio total', widht: 180 },
      { field: 'saleSupportStatusName', header: 'Estatus', width: 180 }
    ];

    this.getSalesSupport();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Venta Facturacion.xlsx'
    };
    this.gridSalesSupport.excelExport(excelExportProperties);
  }

  getSalesSupport() {
    this.spinner.show();
    this.saleSupportHeaderService.getSaleSupports(this.currentUser.userName).subscribe(
      data => {
        this.listSalesSupport = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(SalesSupportDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Soporte de Venta';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
    });
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar el Soporte de Venta?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteSalesSupport(item.id, this.currentUser.userName);
      }
    });
  }

  deleteSalesSupport(saleSupportId, deletedBy) {
    this.spinner.show();
    this.saleSupportHeaderService.deleteSaleSupport(saleSupportId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Soporte de Venta eliminado correctamente.');
        this.getSalesSupport();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
