import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, PriceDetailService, PriceHeaderService, SessionService } from '@app/core/services';
import { FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { PriceType } from '@app/core/enums';

@Component({
  selector: 'app-price-list-detail-form',
  templateUrl: './price-list-detail-form.component.html',
  styleUrls: ['./price-list-detail-form.component.scss']
})
export class PriceListDetailFormComponent implements OnInit {

  @ViewChild('gridListPrice', { static: false })
  public gridListPrice: GridComponent;
  @Input() item: any;

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
  public currency: string;

  constructor(
    private alertMessageService: AlertMessageService,
    private sessionService: SessionService,
    private projectSettings: ProjectSettings,
    private spinner: NgxSpinnerService,
    private priceHeaderService: PriceHeaderService,
    private priceDetailService: PriceDetailService
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
      { field: 'no', header: 'NO', width: 150, textAlign: 'Center' },
      { field: 'saleType', header: 'TIPO', width: 200 },
      { field: 'carModel', header: 'MODELO', width: 200 },
      { field: 'carModelDr', header: 'MODELO DR', width: 200 },
      { field: 'partNumber', header: 'NO. PARTE', width: 200 },
      { field: 'partNumberCustomer', header: 'NO. PARTE CLIENTE', width: 200 },
      { field: 'component', header: 'COMPONENTE', width: 200 },
      { field: 'partName', header: 'NOMBRE DE PARTE', width: 350 },
      { field: 'material', header: 'MATERIAL', width: 200 },
      { field: 'unit', header: 'UNIDAD', width: 200 },
      { field: 'us', header: 'U/S', width: 200 },
      { field: 'option', header: 'OPCION', width: 200 },
      { field: 'taxName', header: 'IMPUESTO', width: 200 },
      { field: 'salePrice', header: 'PRECIO', width: 200 }
    ];
    this.showForm();
  }

  showForm() {
    this.titleHeader = 'Detalle de Orden de Compra';
    this.getPriceById(this.item.id);
  }

  getPriceById(priceById) {
    this.spinner.show();
    this.priceHeaderService.getPriceById(priceById).subscribe(
      data => {
        this.priceList = data;
        this.currency = this.priceList.currencyCode + ' - ' + this.priceList.currencyName;
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

}
