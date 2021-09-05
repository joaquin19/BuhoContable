import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { OrderType } from '@app/core/enums';
import { AlertMessageService, OrderDetailService, OrderHeaderService, PriceHeaderService, SessionService } from '@app/core/services';
import { FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-remissions-detail-form',
  templateUrl: './remissions-detail-form.component.html',
  styleUrls: ['./remissions-detail-form.component.scss']
})
export class RemissionsDetailFormComponent implements OnInit {

  @ViewChild('gridRemissionDetail', { static: false })
  public gridRemissionDetail: GridComponent;
  @Input() item: any;

  public titleHeader: string;
  public remission: any;
  public listRemissions: any;
  public currentUser: any;
  public cols: any;
  public objectPriceList: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public orderTypeCustomer: OrderType;
  public orderTypeProject: OrderType;
  public maxLengthNotes: number;
  public listPrices: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private sessionService: SessionService,
    private projectSettings: ProjectSettings,
    private spinner: NgxSpinnerService,
    private orderHeaderService: OrderHeaderService,
    private orderDetailService: OrderDetailService,
    private priceHeaderService: PriceHeaderService
  ) {
    this.titleHeader = '';
    this.remission = [];
    this.listRemissions = [];
    this.currentUser = '';
    this.maxLengthNotes = 200;
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.orderTypeCustomer = OrderType.Customer;
    this.orderTypeProject = OrderType.Project;
    this.listPrices = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'partNumber', header: 'NO. PARTE', width: 200 },
      { field: 'partName', header: 'DESCRIPCIÓN', width: 250 },
      { field: 'stdPack', header: 'STD PACK', width: 150 },
      { field: 'quantity', header: 'CANTIDAD', width: 150 },
      { field: 'boxes', header: 'CAJAS', width: 150 }
    ];
    this.showForm();
  }

  showForm() {
    this.titleHeader = 'Detalle de Orden de Compra';
    this.getOrderById(this.item.id);
  }

  getOrderById(orderId) {
    this.spinner.show();
    this.orderHeaderService.getOrderById(orderId).subscribe(
      data => {
        this.remission = data;
        this.remission.shippingDate = moment(`${this.remission.shippingDate}`, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.getOrderDetailByHeaderId(orderId);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getOrderDetailByHeaderId(orderHeaderId) {
    this.spinner.show();
    this.orderDetailService.getOrderDetailByHeaderId(orderHeaderId).subscribe(
      data => {
        this.listRemissions = data;
        // this.getPrices();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPrices() {
    this.spinner.show();
    this.priceHeaderService.getPrices(this.currentUser.userName).subscribe(
      data => {
        switch (this.remission.orderTypeId) {
          case this.orderTypeCustomer:
            this.listPrices = data.filter(o => o.priceTypeId === 1 && o.customerId === this.remission.customerId);
            break;
          case this.orderTypeProject:
            this.listPrices = data.filter(o => o.priceTypeId === 2 && o.projectId === this.remission.projectId);
            break;
        }
        this.remission.priceHeaderName = data.filter(o => o.id === this.remission.priceHeaderId)[0].name;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  public downloadPDF() {
    const dateCreateOn = (moment(`${this.remission.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const purchaseOrderNamePDF = `O${this.remission.id}(${this.remission.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.orderHeaderService.getDocumentDefinition(this.cols, this.listRemissions,
        this.remission);
    pdfMake.createPdf(documentDefinition).download(purchaseOrderNamePDF);
  }

  public showPDF() {
    const documentDefinition =
      this.orderHeaderService.getDocumentDefinition(this.cols, this.listRemissions,
        this.remission);
    pdfMake.createPdf(documentDefinition).open();
  }

}
