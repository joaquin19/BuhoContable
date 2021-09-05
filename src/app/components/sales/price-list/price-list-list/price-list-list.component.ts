import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService, PriceHeaderService } from '@app/core/services';
import { PriceListDetailModalComponent } from '../price-list-detail-modal/price-list-detail-modal.component';
import { PriceListStatus } from '@app/core/enums/price-list-status';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.scss']
})
export class PriceListListComponent implements OnInit {

  @ViewChild('gridPriceList', { static: false })
  public gridPriceList: GridComponent;

  public priceList: any;
  public cols: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public currentUser: any;
  public actionForm = Action;
  public priceListStatus = PriceListStatus;

  constructor(
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private alertMessageService: AlertMessageService,
    private priceHeaderService: PriceHeaderService,
    private modalService: NgbModal
  ) {
    this.priceList = [];
    this.cols = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'name', header: 'Nombre', width: 250 },
      { field: 'priceTypeName', header: 'Cliente/Proyecto', width: 250 },
      { field: 'customerName', header: 'Cliente', width: 250 },
      { field: 'projectName', header: 'Proyecto', width: 250 },
      { field: 'startDate', header: 'Fecha de Inicio', width: 150 },
      { field: 'endDate', header: 'Fecha de Fin', width: 150 },
      { field: 'currencyCode', header: 'Moneda', width: 200 },
      { field: 'priceStatusName', header: 'Estatus', width: 150, textAlign: 'right' },
      { field: 'createBy', header: 'Creado Por', width: 200 },
      { field: 'createdOn', header: 'Fecha de Creación', width: 200 }
    ];
    this.getPrices();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista de Precios.xlsx'
    };
    this.gridPriceList.excelExport(excelExportProperties);
  }

  getPrices() {
    this.spinner.show();
    this.priceHeaderService.getPrices(this.currentUser.userName).subscribe(
      data => {
        this.priceList = data;
        this.priceList.forEach(element => {
          element.startDate = moment(element.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
          element.endDate = moment(element.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        });
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  confirmAuthorization(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea enviar a <strong class="text-success">autorizar</strong> la lista de precios <br><strong>${item.name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.sendAuthorization(item.id, this.currentUser.userName);
      }
    });
  }

  sendAuthorization(id, userName) {
    const priceListSave: any = {};
    priceListSave.id = id;
    priceListSave.createBy = userName;

    this.spinner.show();
    this.priceHeaderService.updatePriceListSendAuthorization(priceListSave).subscribe(
      data => {
        this.alertMessageService.successMessage('Lista de precios enviada a autorizar correctamente.');
        this.getPrices();
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
      html: `¿Desea <strong class="text-danger">eliminar</strong> la lista de precios <br><strong>${item.name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deletePrice(item.id, this.currentUser.userName);
      }
    });
  }

  deletePrice(priceListId, deletedBy) {
    this.spinner.show();
    this.priceHeaderService.deletePrice(priceListId, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Lista de Precios eliminada correctamente.');
        this.getPrices();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(PriceListDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Lista de Precios';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getPrices();
    });
  }


}
