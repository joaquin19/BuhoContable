import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent, FilteringEventArgs, ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  EditSettingsModel, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel, ToolbarItems
} from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import * as moment from 'moment';

import { Action } from '@app/core/enums';
import {
  AlertMessageService, CurrencyService, CustomerService, OrderDetailService, SessionService,
  SaleSupportDetailService, SaleSupportHeaderService, OrderHeaderService
} from '@app/core/services';

@Component({
  selector: 'app-sales-support-form',
  templateUrl: './sales-support-form.component.html',
  styleUrls: ['./sales-support-form.component.scss']
})
export class SalesSupportFormComponent implements OnInit {

  @Input() item: any;

  @ViewChild('gridNewSalesSupport', { static: false })
  public gridNewSalesSupport: GridComponent;
  @ViewChild('customerObj', { static: false })
  public customerObj: DropDownListComponent;
  @ViewChild('formSalesSupport', { static: false })
  public formSalesSupport: NgForm;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;
  @ViewChild('listBox', { static: false })
  public listBox: ListBoxComponent;

  public action: Action;
  public cols: any;
  public itemsPage: any;
  public filterGrid: any;
  public gridLines: GridLine;
  public toolbarOptions: ToolbarItems[];
  public editOptions: EditSettingsModel;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public submitted: boolean;
  public titleHeader: string;
  public columnsHeader: any;
  public pageRedirect: string;
  public currentUser: any;
  public listCurrencies: any;

  public itemEdit: any;
  public submittedItemAdd: boolean;
  public isReadOnly: boolean;

  public listCustomers: any;
  public salesSupport: any;
  public listSalesSupport: any;
  public startDate: NgbDateStruct;
  public endDate: NgbDateStruct;

  public listRemissionAll: any;
  public listRemissionCreated: any;
  public listheader: any;
  public listReportSalesSupport: any;
  public setfield: any;
  public toolbar: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private saleSupportHeaderService: SaleSupportHeaderService,
    private saleSupportDetailService: SaleSupportDetailService,
    private customerService: CustomerService,
    private orderHeaderService: OrderHeaderService,
    private orderDetailService: OrderDetailService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private currencyService: CurrencyService,
    private calendar: NgbCalendar
  ) {
    this.submitted = false;
    this.listCurrencies = [];
    this.titleHeader = '';
    this.startDate = this.calendar.getToday();
    this.endDate = this.calendar.getToday();
    this.editOptions = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Normal' };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.setfield = { text: 'name' };
    this.toolbar = { items: ['moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'] };
    this.listCustomers = [];
    this.listRemissionAll = [];
    this.listRemissionCreated = [];
    this.listReportSalesSupport = [];

    this.columnsHeader = [
      { text: '#', classStyle: 'wf-xs text-center' },
      { text: 'FECHA', classStyle: 'wf-md text-center' },
      { text: 'NO. PARTE', classStyle: 'wf-lg text-center' },
      { text: 'CANTIDAD', classStyle: 'wf-md text-center' },
      { text: 'PRECIO UNITARIO', classStyle: 'wf-md text-center' },
      { text: 'SUB TOTAL', classStyle: 'wf-md text-center' },
      { text: 'REFERENCA', classStyle: 'wf-md text-center' },
      { text: 'OBSERVACIÓNES', classStyle: 'wf-md text-center' }
    ];

    this.salesSupport = {
      id: 0,
      customerId: null,
      createBy: '',
      createdOn: ''
    };
    this.listSalesSupport = [];
    this.pageRedirect = '/sales/sales-support';
    this.itemEdit = {};
    this.submittedItemAdd = false;
    this.isReadOnly = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        this.listSalesSupport.map(salesSupport => (salesSupport.inedit = false));
        switch (this.route.snapshot.url[0].path) {
          case 'addSalesSupport':
            this.titleHeader = 'Nuevo Soporte de Venta';
            this.salesSupport = {
              id: 0,
              customerId: null,
              createBy: '',
              startDate: null,
              endDate: null,
              createdOn: ''
            };
            this.action = Action.Create;

            break;
          case 'editSalesSupport':
            this.titleHeader = 'Editar Soporte de Venta';
            this.getSaleSupportHeaderId(params.id);
            this.isReadOnly = true;
            this.item = params.id;
            this.action = Action.Edit;
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
    this.getCustomers();
    this.getCurrencies();
  }

  getSaleSupportHeaderId(saleSupportId) {
    this.spinner.show();
    this.saleSupportHeaderService.getSaleSupportById(saleSupportId).subscribe(
      data => {
        this.salesSupport = data;
        const [dayStart, monthStart, yearStart] =
          moment(this.salesSupport.startDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const [dayEnd, monthEnd, yearEnd] =
          moment(this.salesSupport.endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const objStartDate = { day: parseInt(dayStart, 0), month: parseInt(monthStart, 0), year: parseInt(yearStart, 0) };
        const objEndDate = { day: parseInt(dayEnd, 0), month: parseInt(monthEnd, 0), year: parseInt(yearEnd, 0) };
        this.startDate = objStartDate;
        this.endDate = objEndDate;
        this.getOrdersByCustomerId();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.currencyObj.value = this.action === Action.Edit ? this.salesSupport.currencyId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeCurrency() {
    const currencyText = this.currencyObj.text;
    if (currencyText !== null && this.action !== Action.Edit) {
      this.salesSupport.currencyName = currencyText;
      this.getOrdersByCustomerId();
    }
  }

  filteringCurrency: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listCurrencies, query);
  }

  getCustomers() {
    this.spinner.show();
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        this.customerObj.value = this.action === Action.Edit ? this.salesSupport.customerId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeCustomer() {
    const customerText = this.customerObj.text;
    if (customerText !== null && this.action !== Action.Edit) {
      this.getOrdersByCustomerId();
    }
  }

  filteringCustomer: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomers, query);
  }

  getOrdersByCustomerId() {
    if (this.customerObj.value == null && this.action === Action.Create) {
      return;
    }
    if (this.currencyObj.value == null && this.action === Action.Create) {
      return;
    }

    const customerId = (this.action === Action.Create) ? this.customerObj.value : this.salesSupport.customerId;
    const currencyId = (this.action === Action.Create) ? this.currencyObj.value : this.salesSupport.currencyId;

    this.spinner.show();
    const startDate =
      moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const endDate =
      moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');

    const saleSupportHeaderId = this.salesSupport.id;
    this.orderHeaderService.getOrdersByCustomerId(customerId, currencyId, startDate, endDate, saleSupportHeaderId).subscribe(
      data => {
        this.listRemissionAll = data;
        this.listRemissionAll.forEach(element => {
          element.name = element.folio;
          element.code = element.id;
        });
        switch (this.action) {
          case Action.Create:
            const value = this.listReportSalesSupport.map(i => i.id);
            this.listRemissionCreated = this.listRemissionAll.filter(item => !value.includes(item.id));
            break;
          case Action.Edit:
            this.getSaleSupportDetail(this.item);
            break;
        }

        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  saveForm() {
    this.submitted = true;

    if (this.formSalesSupport.invalid) {
      return;
    }

    if (this.listSalesSupport.length === 0) {
      this.alertMessageService.warningMessage('Favor de ingresar al menos una remisión');
      return;
    }
    const salesSupportSave: any = {};

    salesSupportSave.id = this.salesSupport.id;
    salesSupportSave.customerId = this.salesSupport.customerId;
    salesSupportSave.currencyId = this.salesSupport.currencyId;
    salesSupportSave.projectId = this.listRemissionCreated.projectId;
    salesSupportSave.createBy = this.currentUser.userName;
    salesSupportSave.startDate =
      moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    salesSupportSave.endDate =
      moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');

    const detailArray = [];
    for (const saleSupport of this.listSalesSupport) {
      detailArray.push({
        id: saleSupport.id,
        saleSupportHeaderId: saleSupport.saleSupportHeaderId,
        orderHeaderId: saleSupport.orderHeaderId,
        folio: saleSupport.folio,
        shippingDate: saleSupport.shippingDate,
        carModel: saleSupport.carModel,
        carModelDr: saleSupport.carModelDr,
        partNumber: saleSupport.partNumber,
        partNumberCustomer: saleSupport.partNumberCustomer,
        component: saleSupport.component,
        partName: saleSupport.partName,
        quantity: saleSupport.quantity,
        salePrice: saleSupport.salePrice,
        subTotal: saleSupport.subTotal,
        total: saleSupport.total,
        reference: saleSupport.reference,
        observations: saleSupport.observations
      });
    }
    salesSupportSave.detail = detailArray;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.saleSupportHeaderService.saveSaleSupport(salesSupportSave).subscribe(data => {
          this.alertMessageService.successMessage('Soporte de venta guardada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.saleSupportHeaderService.updateSaleSupport(salesSupportSave).subscribe(data => {
          this.alertMessageService.successMessage('Soporte de Venta editada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  dateSelectStart() {
    const startDate = moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD');
    const endDate = moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD');

    if (startDate > endDate) {
      this.startDate = this.calendar.getToday();
      this.alertMessageService.warningMessage(`La Fecha de Inicio debe ser menor o igual a la Fecha de Fin.`);
    }
    this.getOrdersByCustomerId();
  }

  dateSelectEnd() {
    const startDate = moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD');
    const endDate = moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD');

    if (endDate < startDate) {
      this.endDate = this.calendar.getToday();
      this.alertMessageService.warningMessage(`La Fecha de Fin debe ser mayor o igual a la Fecha de Inicio.`);
    }
    this.getOrdersByCustomerId();
  }

  actionComplete(args) {
    if (args.items !== undefined) {
      const order = this.listSalesSupport.filter(o => o.orderHeaderId === args.items[0].id);
      if (order.length > 0) {
        // delete order
        this.deleteOrderDetail(args.items[0]);
      } else {
        // add order
        this.getOrderDetailByHeaderId(args.items[0]);
      }
    }
  }

  deleteOrderDetail(order) {
    this.listReportSalesSupport = this.listReportSalesSupport.filter(o => o.id !== order.id);
    this.listSalesSupport = this.listSalesSupport.filter(o => o.orderHeaderId !== order.id);
  }

  getOrderDetailByHeaderId(order) {
    this.spinner.show();
    this.orderDetailService.getOrderDetailByHeaderId(order.id).subscribe(
      data => {
        let listData = [];
        listData = data;
        listData.forEach(orderDetail => {
          const element: any = {};
          element.folio = order.folio;
          element.orderHeaderId = order.id;
          element.shippingDate = order.shippingDate;
          element.carModel = orderDetail.carModel;
          element.carModelDr = orderDetail.carModelDr;
          element.partNumber = orderDetail.partNumber;
          element.partNumberCustomer = orderDetail.partNumberCustomer;
          element.component = orderDetail.component;
          element.partName = orderDetail.partName;
          element.quantity = orderDetail.quantity;
          element.salePrice = orderDetail.salePrice;
          element.subTotal = element.quantity * element.salePrice;
          element.total = 0;
          element.reference = order.id;
          element.observations = orderDetail.carModel;
          this.listSalesSupport.push(element);
        });

        this.listReportSalesSupport.push(order);

        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSaleSupportDetail(saleSupportHeaderId) {
    this.saleSupportDetailService.getSaleSupportDetailByHeaderId(saleSupportHeaderId).subscribe(
      data => {
        this.listSalesSupport = data;

        const mapValue = this.listSalesSupport.map(o => o.orderHeaderId);
        this.listReportSalesSupport = this.listRemissionAll.filter(item => mapValue.includes(item.id));

        const value = this.listReportSalesSupport.map(i => i.id);
        this.listRemissionCreated = this.listRemissionAll.filter(item => !value.includes(item.id));

        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
