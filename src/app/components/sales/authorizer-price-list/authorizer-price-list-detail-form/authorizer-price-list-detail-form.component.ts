import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

import { ProjectSettings } from '@app/core/constants';
import { Action, AuthorizationStatus, PriceType, ProcessType } from '@app/core/enums';
import { AlertMessageService, AuthorizationProcessService, PriceDetailService, PriceHeaderService, SessionService, TaxService } from '@app/core/services';

@Component({
  selector: 'app-authorizer-price-list-detail-form',
  templateUrl: './authorizer-price-list-detail-form.component.html',
  styleUrls: ['./authorizer-price-list-detail-form.component.scss']
})
export class AuthorizerPriceListDetailFormComponent implements OnInit {

  @ViewChild('gridListPrice', { static: false })
  public gridListPrice: GridComponent;
  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  public titleHeader: string;
  public priceList: any;
  public listPrice: any;
  public currentUser: any;
  public cols: any;
  public objectPriceList: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public priceTypeCustomer: PriceType;
  public priceTypeProject: PriceType;
  public maxLengthNotes: number;
  public authorizationStatusId: AuthorizationStatus;
  public submitted: boolean;

  constructor(
    private alertMessageService: AlertMessageService,
    private sessionService: SessionService,
    private projectSettings: ProjectSettings,
    private spinner: NgxSpinnerService,
    private priceHeaderService: PriceHeaderService,
    private priceDetailService: PriceDetailService,
    private authorizationProcessService: AuthorizationProcessService
  ) {
    this.titleHeader = '';
    this.priceList = [];
    this.listPrice = [];
    this.currentUser = '';
    this.maxLengthNotes = 200;
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.priceTypeCustomer = PriceType.Customer;
    this.priceTypeProject = PriceType.Project;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'no', header: 'NO', width: 150, textAlign: 'center' },
      { field: 'saleType', header: 'TIPO', width: 200 },
      { field: 'carModel', header: 'MODELO', width: 200 },
      { field: 'carModelDr', header: 'MODELO DR', width: 200 },
      { field: 'partNumber', header: 'NÚMERO DE PARTE', width: 200 },
      { field: 'partNumberCustomer', header: 'NO DE PARTE CLIENTE', width: 250 },
      { field: 'component', header: 'COMPONENTE', width: 150 },
      { field: 'partName', header: 'NOMBRE DE PARTE', width: 150 },
      { field: 'material', header: 'MATERIAL', width: 150 },
      { field: 'unit', header: 'UNIDAD', width: 200 },
      { field: 'us', header: 'U/S', width: 200 },
      { field: 'option', header: 'OPCIÓN', width: 200 },
      { field: 'taxName', header: 'IMPUESTO', width: 200 },
      { field: 'salePrice', header: 'PRECIO VENTA', width: 200 }
    ];
    this.showForm();
  }

  showForm() {
    this.titleHeader = 'Detalle de Orden de Compra';
    this.getPriceById(this.item.valueId);
  }

  getPriceById(priceById) {
    this.spinner.show();
    this.priceHeaderService.getPriceById(priceById).subscribe(
      data => {
        this.priceList = data;
        this.priceList.startDate = moment(this.priceList.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.priceList.endDate = moment(this.priceList.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.getPriceDetailByHeaderId(priceById);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPriceDetailByHeaderId(priceHeaderId) {
    this.spinner.show();
    this.priceDetailService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
      data => {
        this.listPrice = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  processAuthorizationForm(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;
    this.submitted = true;
    const authorizationSave: any = {};

    const listPriceArray = [];
    listPriceArray.push({
      id: this.item.id,
      valueId: this.item.valueId
    });

    authorizationSave.processTypeId = ProcessType.Prices;
    authorizationSave.authorizationStatusId = authorizationStatusId;
    authorizationSave.detail = listPriceArray;
    authorizationSave.observation = this.priceList.observation;
    authorizationSave.createBy = this.currentUser.userName;

    console.log('authorizationSave', authorizationSave);

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(authorizationSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Lista de Precios Autorizada correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Lista de Precios Rechazada correctamente.');
        }
        this.spinner.hide();
        this.saveItem.emit(true);
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });

  }

}
