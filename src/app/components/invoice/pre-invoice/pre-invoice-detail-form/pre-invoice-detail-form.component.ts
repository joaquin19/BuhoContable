import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { PreInvoiceType } from '@app/core/enums/pre-invoice-type';
import { AlertMessageService, SessionService } from '@app/core/services';
import { FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pre-invoice-detail-form',
  templateUrl: './pre-invoice-detail-form.component.html',
  styleUrls: ['./pre-invoice-detail-form.component.scss']
})
export class PreInvoiceDetailFormComponent implements OnInit {

  @ViewChild('gridPreInvoiceList', { static: false })
  public gridPreInvoiceList: GridComponent;
  @Input() item: any;

  public titleHeader: string;
  public preInvoiceDetail: any;
  public preInvoiceList: any;
  public currentUser: any;
  public cols: any;
  public objectPreInvoiceList: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public preInvoiceTypeSupport: PreInvoiceType;
  public preInvoiceTypeOutSupport: PreInvoiceType;
  public maxLengthNotes: number;

  constructor(
    private alertMessageService: AlertMessageService,
    private sessionService: SessionService,
    private projectSettings: ProjectSettings,
    private spinner: NgxSpinnerService,
    // private priceHeaderService: PriceHeaderService,
    // private priceDetailService: PriceDetailService
  ) {
    this.titleHeader = '';
    this.preInvoiceDetail = [];
    this.preInvoiceDetail = [];
    this.currentUser = '';
    this.maxLengthNotes = 200;
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.preInvoiceTypeSupport = PreInvoiceType.Support;
    this.preInvoiceTypeOutSupport = PreInvoiceType.OutSupport;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'no', header: 'No', width: 150, textAlign: 'center' },
      { field: 'quantity', header: 'Cantidad', width: 200 },
      { field: 'partNumber', header: 'Numero de Parte', width: 200 },
      { field: 'partName', header: 'Nombre de Parte', width: 350 },
      { field: 'claveUnitMeasure', header: 'Clave Uniad de Medida', width: 150 },
      { field: 'claevProductService', header: 'Clave Prodducto Serv.', width: 150 },
    ];
    this.showForm();
  }

  showForm() {
    this.titleHeader = 'Detalle de la Pre-Facctura';
    this.getPreInoiecById(this.item.id);
  }

  getPreInoiecById(preInvoiceById) {
    this.spinner.show();
    // this.priceHeaderService.getPriceById(priceById).subscribe(
    //   data => {
    //     this.preInvoiceDetail = data;
    //     this.preInvoiceDetail.startDate = moment(this.preInvoiceDetail.startDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    //     this.preInvoiceDetail.endDate = moment(this.preInvoiceDetail.endDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    //     this.getPriceDetailByHeaderId(priceById);
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.alertMessageService.errorMessage(error.message);
    //   });
  }

  getPreInvoiceDetailByHeaderId(preInvoiceHeaderId) {
    this.spinner.show();
    // this.priceDetailService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
    //   data => {
    //     this.listPrice = data;
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.alertMessageService.errorMessage(error.message);
    //   });
  }

}
