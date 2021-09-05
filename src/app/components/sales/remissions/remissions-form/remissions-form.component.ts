import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ToolbarItems, EditSettingsModel, IEditCell } from '@syncfusion/ej2-angular-grids';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { Action, OrderType, PriceListStatus } from '@app/core/enums';
import {
  AlertMessageService, SessionService, CustomerService, ProjectsService,
  OrderHeaderService, OrderDetailService, PriceHeaderService, PriceDetailService
} from '@app/core/services';

@Component({
  selector: 'app-remissions-form',
  templateUrl: './remissions-form.component.html',
  styleUrls: ['./remissions-form.component.scss']
})
export class RemissionsFormComponent implements OnInit {

  @ViewChild('gridNewRemissions', { static: false })
  public gridNewRemissions: GridComponent;
  @ViewChild('customerObj', { static: false })
  public customerObj: DropDownListComponent;
  @ViewChild('projectObj', { static: false })
  public projectObj: DropDownListComponent;
  @ViewChild('priceObj', { static: false })
  public priceObj: DropDownListComponent;
  @ViewChild('formRemission', { static: false })
  public formRemission: NgForm;

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
  public listHeaders: any;
  public pageRedirect: string;
  public currentUser: any;
  public numericParams: IEditCell;

  public listProjects: any;
  public listCustomers: any;
  public listPrices: any;
  public listPriceDetail: any;
  public remission: any;
  public listRemissions: any;
  public shippingDate: NgbDateStruct;
  public orderTypeCustomer: OrderType;
  public orderTypeProject: OrderType;
  public newItemAdd: any;
  public newItem: boolean;
  public submittedItemAdd: boolean;
  public itemEdit: any;
  public columnsHeader: any;
  public isReadOnly: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private orderHeaderService: OrderHeaderService,
    private orderDetailService: OrderDetailService,
    private customerService: CustomerService,
    private priceHeaderService: PriceHeaderService,
    private priceDetailService: PriceDetailService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private projectsService: ProjectsService,
    private calendar: NgbCalendar
  ) {
    this.submitted = false;
    this.titleHeader = '';
    this.listHeaders = [];
    this.editOptions = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Normal' };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.numericParams = {};
    this.listProjects = [];
    this.listCustomers = [];
    this.listPrices = [];
    this.listPriceDetail = [];
    this.remission = {
      id: 0,
      orderTypeId: 1,
      customerId: null,
      projectId: null,
      priceHeaderId: null,
      address: '',
      shippingAddress: '',
      shippingDate: '',
      noOrder: null,
      customerCustomName: '',
      noOrderCustomer: null,
      tarima: '',
      totalPieces: 0,
      createBy: '',
      createdOn: ''
    };
    this.listRemissions = [];
    this.shippingDate = this.calendar.getToday();
    this.orderTypeCustomer = OrderType.Customer;
    this.orderTypeProject = OrderType.Project;
    this.pageRedirect = '/sales/remissions';
    this.newItemAdd = {
      carModel: '',
      carModelDr: '',
      partNumber: '',
      partNumberCustomer: '',
      component: '',
      partName: '',
      stdPack: 0,
      boxes: 0,
      quantity: 0,
      salePrice: 0
    };
    this.newItem = false;
    this.submittedItemAdd = false;
    this.itemEdit = {};

    this.columnsHeader = [
      { text: '#', classStyle: 'wf-xs text-center' },
      { text: 'NO. PARTE', classStyle: 'wf-lg text-center' },
      { text: 'DESCRIPCIÓN', classStyle: 'wf-xxxlg text-center' },
      { text: 'STD PACK', classStyle: 'wf-md text-center' },
      { text: 'CANTIDAD', classStyle: 'wf-md text-center' },
      { text: 'CAJAS', classStyle: 'wf-sm text-center' },
      { text: '', classStyle: 'wf-md' }
    ];
    this.isReadOnly = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.numericParams = {
      params: {
        validateDecimalOnType: true,
        decimals: 0,
        format: 'N',
        value: 0
      }
    };

    this.cols = [
      {
        field: 'partNumber', header: 'NO. PARTE', width: 200, textAlign: 'center',
        editType: 'defaultEdit'
      },
      {
        field: 'partName', header: 'DESCRIPCIÓN', width: 250,
        editType: 'defaultEdit'
      },
      {
        field: 'stdPack', header: 'STD PACK', width: 100,
        editType: 'defaultEdit'
      },
      {
        field: 'quantity', header: 'CANTIDAD', width: 100, textAlign: 'center', format: 'N',
        editType: 'numericEdit', edit: `${this.numericParams}`
      }
    ];

    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addRemission':
            this.titleHeader = 'Nueva Remisión';
            this.remission = {
              id: 0,
              orderTypeId: 1,
              customerId: null,
              projectId: null,
              priceHeaderId: null,
              address: '',
              shippingAddress: '',
              shippingDate: '',
              noOrder: null,
              customerCustomName: '',
              noOrderCustomer: null,
              tarima: '',
              totalPieces: 0,
              createBy: '',
              createdOn: ''
            };
            this.action = Action.Create;
            break;
          case 'editRemission':
            this.titleHeader = 'Editar Remisión';
            this.remission = {
              id: 0,
              orderTypeId: 1,
              customerId: null,
              projectId: null,
              priceHeaderId: null,
              address: '',
              shippingAddress: '',
              shippingDate: '',
              noOrder: null,
              customerCustomName: '',
              noOrderCustomer: null,
              tarima: '',
              totalPieces: 0,
              createBy: '',
              createdOn: ''
            };
            this.getOrderById(params.id);
            this.action = Action.Edit;
            this.isReadOnly = true;
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
    this.getProjects();
  }

  changeOrderType() {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
    }
    this.getPrices();
  }

  getOrderById(orderId) {
    this.spinner.show();
    this.orderHeaderService.getOrderById(orderId).subscribe(
      data => {
        this.remission = data;
        const [day, month, year] = moment(this.remission.shippingDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const objShippingDate = { day: parseInt(day, 0), month: parseInt(month, 0), year: parseInt(year, 0) };
        this.shippingDate = objShippingDate;
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
        // this.listRemissions.map(remission => (remission.inedit = false));
        this.listRemissions.map(remission => {
          remission.inedit = false;
        });
        this.getPrices();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomers() {
    this.spinner.show();
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        this.customerObj.value = this.action === Action.Edit ? this.remission.customerId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCustomer: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomers, query);
  }

  changeCustomer() {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
      this.listPrices = [];
    }
    const customerValue = this.customerObj.value;
    if (customerValue !== null) {
      this.getPrices();
    }
  }

  getProjects() {
    this.spinner.show();
    this.projectsService.getProjects().subscribe(
      data => {
        this.listProjects = data;
        if (this.action === Action.Edit) {
          if (this.remission.projectId !== null) {
            this.projectObj.value = this.remission.projectId;
          }
        }
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringProject: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listProjects, query);
  }

  changeProject() {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
      this.listPrices = [];
    }
    const projectValue = this.projectObj.value;
    if (projectValue !== null) {
      this.getPrices();
    }
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
        this.listPrices = [...this.listPrices.filter(price => price.priceStatusId === PriceListStatus.Authorized)];
        this.priceObj.value = this.action === Action.Edit ? this.remission.priceHeaderId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringPrice: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listPrices, query);
  }

  changePrice() {
    if (this.action !== Action.Edit) {
      this.listRemissions = [];
      this.listPriceDetail = [];
    }
    const priceValue = this.priceObj.value;
    if (priceValue !== null) {
      this.getPriceDetailByHeaderId(priceValue);
    }
  }

  getPriceDetailByHeaderId(priceHeaderId) {
    this.spinner.show();
    this.priceDetailService.getPriceDetailByHeaderId(priceHeaderId).subscribe(
      data => {
        this.listPriceDetail = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  saveForm() {
    this.submitted = true;
    this.submittedItemAdd = true;

    if (this.formRemission.invalid) {
      return;
    }

    if (this.listRemissions.length === 0) {
      this.alertMessageService.warningMessage('Debe agregar al menos 1 registro a la lista de precios.');
      return;
    }

    let index = 1;
    for (const remission of this.listRemissions) {

      if (remission.stdPack === 0) {
        this.alertMessageService.warningMessage(`El STD PACK debe ser mayor a 0 en el registro No. ${index}.`);
        return;
      }

      if (remission.quantity === 0) {
        this.alertMessageService.warningMessage(`La CANTIDAD debe ser mayor a 0 en el registro No. ${index}.`);
        return;
      }

      index++;
    }

    const remissionSave: any = {};

    remissionSave.id = this.remission.id;
    remissionSave.orderTypeId = this.remission.orderTypeId;
    remissionSave.customerId = this.remission.orderTypeId === this.orderTypeCustomer ? this.remission.customerId : null;
    remissionSave.projectId = this.remission.orderTypeId === this.orderTypeProject ? this.remission.projectId : null;
    remissionSave.priceHeaderId = this.remission.priceHeaderId;
    remissionSave.address = this.remission.address;
    remissionSave.shippingAddress = this.remission.shippingAddress;
    remissionSave.shippingDate =
      moment(`${this.shippingDate.year}-${this.shippingDate.month}-${this.shippingDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    remissionSave.noOrder = this.remission.noOrder;
    remissionSave.customerCustomName = this.remission.customerCustomName;
    remissionSave.noOrderCustomer = this.remission.noOrderCustomer;
    remissionSave.tarima = this.remission.tarima;
    remissionSave.totalPieces = this.remission.totalPieces;
    remissionSave.createBy = this.currentUser.userName;

    const detailArray = [];
    for (const remission of this.listRemissions) {

      detailArray.push({
        id: remission.id === undefined ? 0 : remission.id,
        carModel: remission.carModel,
        carModelDr: remission.carModelDr,
        partNumber: remission.partNumber,
        partNumberCustomer: remission.partNumberCustomer,
        component: remission.component,
        partName: remission.partName,
        stdPack: remission.stdPack,
        boxes: remission.boxes,
        quantity: remission.quantity,
        salePrice: remission.salePrice
      });
    }

    remissionSave.detail = detailArray;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.orderHeaderService.saveOrder(remissionSave).subscribe(data => {
          this.alertMessageService.successMessage('Remisión guardada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.orderHeaderService.updateOrder(remissionSave).subscribe(data => {
          this.alertMessageService.successMessage('Remisión editada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  addNewItem() {
    this.newItem = true;
  }

  blurPartNumber() {
    if (this.newItemAdd.partNumber.trim() !== '') {

      if (this.listPriceDetail.length === 0) {
        this.alertMessageService.warningMessage(`Debe seleccionar una lista de precios.`);
        return;
      }

      if (this.listRemissions.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
        this.alertMessageService.warningMessage(
          `El No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> ya esta agregado en la remisión.`
        );
        this.newItemAdd.partNumber = '';
        return;
      }

      if (!this.listPriceDetail.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
        this.alertMessageService.warningMessage(
          `No se encontro el No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> en la lista de precios selecionada.`
        );
        return;
      } else {
        const product = this.listPriceDetail.filter(o => o.partNumber === this.newItemAdd.partNumber.trim())[0];
        this.newItemAdd.partName = product.partName;
      }
    }
  }

  saveItemAdd() {
    this.submittedItemAdd = true;

    if (this.validationsItem()) {
      if (this.newItemAdd.partNumber.trim() !== '') {

        if (this.listPriceDetail.length === 0) {
          this.alertMessageService.warningMessage(`Debe seleccionar una lista de precios.`);
        }

        if (this.listRemissions.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
          this.alertMessageService.warningMessage(
            `El No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> ya esta agregado en la remisión.`
          );
          this.newItemAdd.partNumber = '';
          return;
        }

        if (!this.listPriceDetail.some(o => o.partNumber === this.newItemAdd.partNumber.trim())) {
          this.alertMessageService.warningMessage(
            `No se encontro el No. de Parte <strong>${this.newItemAdd.partNumber.trim()}</strong> en la lista de precios selecionada.`
          );
          return;
        } else {
          const product = this.listPriceDetail.filter(o => o.partNumber === this.newItemAdd.partNumber.trim())[0];
          this.newItemAdd.carModel = product.carModel;
          this.newItemAdd.carModelDr = product.carModelDr;
          this.newItemAdd.partNumberCustomer = product.partNumberCustomer;
          this.newItemAdd.component = product.component;
          this.newItemAdd.boxes = this.newItemAdd.quantity / this.newItemAdd.stdPack;
          this.newItemAdd.salePrice = product.salePrice;

          this.listRemissions.push(this.newItemAdd);

          this.remission.totalPieces = this.calculatePieces();

          this.newItem = false;
          this.newItemAdd = {
            carModel: '',
            carModelDr: '',
            partNumber: '',
            partNumberCustomer: '',
            component: '',
            partName: '',
            stdPack: 0,
            boxes: 0,
            quantity: 0,
            salePrice: 0
          };

          this.submittedItemAdd = false;
        }
      } else {
        this.newItemAdd.partNumber = '';
        return;
      }
    } else {
      return;
    }
  }

  validationsItem() {
    if (this.newItemAdd.stdPack === null) {
      return false;
    }

    if (this.newItemAdd.stdPack <= 0) {
      return false;
    }

    if (this.newItemAdd.quantity === null) {
      return false;
    }

    if (this.newItemAdd.quantity <= 0) {
      return false;
    }

    return true;
  }

  cancelItemAdd() {
    this.newItemAdd = {
      carModel: '',
      carModelDr: '',
      partNumber: '',
      partNumberCustomer: '',
      component: '',
      partName: '',
      stdPack: 0,
      boxes: 0,
      quantity: 0,
      salePrice: 0
    };
    this.newItem = false;
  }

  editItem(item, index: number) {
    this.itemEdit = { ...item };
    this.listRemissions[index].inedit = true;
  }

  deleteItem(index: number) {
    this.listRemissions.splice(index, 1);
    this.remission.totalPieces = this.calculatePieces();
  }

  saveItem(item, index: number) {
    this.submittedItemAdd = true;

    if (this.validationsEditItem(item)) {
      if (item.partNumber.trim() !== '') {
        if (this.listPriceDetail.length === 0) {
          this.alertMessageService.warningMessage(`Debe seleccionar una lista de precios.`);
          return;
        }

        item.boxes = item.quantity / item.stdPack;

        this.remission.totalPieces = this.calculatePieces();
        this.listRemissions[index].inedit = false;

      } else {
        item.partNumber = '';
        return;
      }
    } else {
      return;
    }
  }

  cancelItem(index: number) {
    this.listRemissions[index] = { ...this.itemEdit };
    this.itemEdit = {};
    this.listRemissions[index].inedit = false;
  }

  validationRequiredContol(value) {
    if (value === null) {
      return true;
    }

    if (isNaN(value)) {
      if (value.trim() === '') {
        return true;
      }
    }

    return false;
  }

  validationMinlengthContol(value) {
    if (!isNaN(value)) {
      if (value <= 0) {
        return true;
      }
    }
    return false;
  }

  validationsEditItem(item) {

    if (item.stdPack === null) {
      return false;
    }

    if (item.stdPack <= 0) {
      return false;
    }

    if (item.quantity === null) {
      return false;
    }

    if (item.quantity <= 0) {
      return false;
    }

    return true;
  }

  calculatePieces() {
    let totalPieces = 0;
    for (const remission of this.listRemissions) {
      totalPieces += remission.quantity;
    }
    return totalPieces;
  }

}
