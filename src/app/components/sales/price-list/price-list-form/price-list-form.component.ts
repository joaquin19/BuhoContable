import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { Action, PriceType, Template } from '@app/core/enums';
import { ProjectSettings } from '@app/core/constants';
import {
  AlertMessageService, SessionService, CustomerService, PriceHeaderService, PriceDetailService,
  ProjectsService, CurrencyService, TaxService, DownloadFileService, ProductService, ProjectCustomerService
} from '@app/core/services';


@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.scss']
})
export class PriceListFormComponent implements OnInit {

  @ViewChild('formPriceList', { static: true })
  public formPriceList: NgForm;
  @ViewChild('customerObj', { static: false })
  public customerObj: DropDownListComponent;
  @ViewChild('projectObj', { static: false })
  public projectObj: DropDownListComponent;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;
  @ViewChild('fileUploadPriceListImported', { static: false })
  public fileUploadPriceListImported: ElementRef;

  public startDate: NgbDateStruct;
  public endDate: NgbDateStruct;
  public format: string;
  public objectPriceList: any;
  public action: Action;

  public titleHeader: string;
  public priceList: any;
  public listPrice: any;
  public listPriceTable: any;
  public pageRedirect: string;
  public maxLengthNotes: number;
  public submitted: boolean;
  public typesFiles: string[];
  public files: any;
  public newItemAdd: any;
  public newItem: boolean;
  public currentUser: any;
  public itemEdit: any;
  public listCustomers: any;
  public listProjects: any;
  public listCustomersProject: any;
  public fileNamePriceListImported: string;
  public priceTypeCustomer: PriceType;
  public priceTypeProject: PriceType;
  public listCurrencies: any;
  public listTaxes: any;
  public listProducts: any;
  public showImport: boolean;
  public submittedItemAdd: boolean;
  public columnsHeader: any;
  public rowSelected: number;
  public itemsPage: any;
  public page: number;
  public pageSize: number;
  public collectionSize: number;
  public errorsCount: number;
  public isReadOnly: boolean;

  constructor(
    private sessionService: SessionService,
    private projectSettings: ProjectSettings,
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private spinner: NgxSpinnerService,
    private priceHeaderService: PriceHeaderService,
    private priceDetailService: PriceDetailService,
    private customerService: CustomerService,
    private currencyService: CurrencyService,
    private taxService: TaxService,
    private downloadFileService: DownloadFileService,
    private productService: ProductService,
    private projectsService: ProjectsService,
    private projectCustomerService: ProjectCustomerService,
    private calendar: NgbCalendar
  ) {
    this.fileNamePriceListImported = '';
    this.titleHeader = '';

    this.priceList = {};
    this.listPrice = [];
    this.listPriceTable = [];
    this.startDate = this.calendar.getToday();
    this.endDate = this.calendar.getToday();
    this.format = 'DD-MM-YYYY';
    this.pageRedirect = '/sales/price-list';
    this.maxLengthNotes = 200;
    this.submitted = false;
    this.typesFiles = ['.xls', '.xlsx'];
    this.files = [];
    this.objectPriceList = [];
    this.newItemAdd = {
      no: 0,
      saleType: '',
      carModel: '',
      carModelDr: '',
      partNumber: '',
      partNumberCustomer: '',
      component: '',
      partName: '',
      material: '',
      unit: '',
      us: 0,
      option: 0,
      taxName: '',
      salePrice: 0
    };
    this.submittedItemAdd = false;
    this.itemEdit = {};
    this.newItem = false;
    this.listCustomers = [];
    this.listProjects = [];
    this.listCustomersProject = [];
    this.priceTypeCustomer = PriceType.Customer;
    this.priceTypeProject = PriceType.Project;
    this.listCurrencies = [];
    this.listTaxes = [];
    this.listProducts = [];
    this.showImport = true;

    this.columnsHeader = [
      { text: 'NO', classStyle: 'wf-xs' },
      { text: 'TIPO', classStyle: 'wf-sm' },
      { text: 'MODELO', classStyle: 'wf-md' },
      { text: 'MODELO DR', classStyle: 'wf-md' },
      { text: 'NO. PARTE', classStyle: 'wf-md' },
      { text: 'NO. PARTE CLIENTE', classStyle: 'wf-md' },
      { text: 'COMPONENTE', classStyle: 'wf-md' },
      { text: 'NOMBRE DE PARTE', classStyle: 'wf-xxxlg' },
      { text: 'MATERIAL', classStyle: 'wf-md' },
      { text: 'UNIDAD', classStyle: 'wf-md' },
      { text: 'U/S', classStyle: 'wf-md' },
      { text: 'OPCION', classStyle: 'wf-md' },
      { text: 'IMPUESTO', classStyle: 'wf-md' },
      { text: 'PRECIO', classStyle: 'wf-md' }
      // { text: '', classStyle: 'wf-md' }
    ];

    this.rowSelected = -1;
    this.itemsPage = this.projectSettings.itemsPage();
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;
    this.errorsCount = 0;
    this.isReadOnly = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addPriceList':
            this.titleHeader = 'Nueva Lista de Precios';
            this.priceList = {
              id: 0,
              priceTypeId: 1,
              customerId: null,
              projectId: null,
              currencyId: null,
              name: '',
              startDate: '',
              endDate: '',
              notes: '',
              createBy: '',
              createdOn: ''
            };
            this.action = Action.Create;
            this.showImport = true;
            this.isReadOnly = false;
            break;
          case 'editPriceList':
            this.titleHeader = 'Edición de Lista de Precios';
            this.priceList = {
              id: 0,
              priceTypeId: 1,
              customerId: null,
              projectId: null,
              currencyId: null,
              name: '',
              startDate: '',
              endDate: '',
              notes: '',
              createBy: '',
              createdOn: ''
            };
            this.getPriceById(params.id);
            this.action = Action.Edit;
            this.showImport = false;
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
    this.getCurrencies();
    this.getTaxes();
    this.getProducts();
  }

  changeOrderType() {
    this.clearFile();
  }

  getPriceById(priceById) {
    this.spinner.show();
    this.priceHeaderService.getPriceById(priceById).subscribe(
      data => {
        this.priceList = data;
        const [dayStart, monthStart, yearStart] = moment(this.priceList.startDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const [dayEnd, monthEnd, yearEnd] = moment(this.priceList.endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const objStartDate = { day: parseInt(dayStart, 0), month: parseInt(monthStart, 0), year: parseInt(yearStart, 0) };
        const objEndDate = { day: parseInt(dayEnd, 0), month: parseInt(monthEnd, 0), year: parseInt(yearEnd, 0) };
        this.startDate = objStartDate;
        this.endDate = objEndDate;
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
        this.collectionSize = this.listPrice.length;
        this.refreshItems();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changePriceType() {
    this.clearFile();
    switch (this.priceList.priceTypeId) {
      case this.priceTypeCustomer:
        this.customerObj.value = null;
        break;
      case this.priceTypeProject:
        this.projectObj.value = null;
        break;
    }

  }

  onChange(event: Event): void {
    this.listPrice = [];
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadPriceListImported.nativeElement.value = '';
      return;
    }

    this.fileNamePriceListImported = fileName;

    this.spinner.show();
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      let data: any = e.target.result;
      data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 'A' });
      if (sheet.length !== 0) {
        const listExcelImport = sheet;
        listExcelImport.splice(0, 1);
        this.listPrice = this.setProductsImport(listExcelImport);
        this.validationItems();
        this.collectionSize = this.listPrice.length;
        this.refreshItems();
      } else {
        this.alertMessageService.warningMessage('El Documento no contiene datos');
      }
    };
    reader.onloadend = (e) => {
      fileInput.value = '';
      this.spinner.hide();
    };
  }

  setProductsImport(data) {
    const productsImport: any = [];
    for (const item of data) {
      const productImport: any = {
        id: 0,
        no: 0,
        saleType: null,
        carModel: null,
        carModelDr: '',
        partNumber: null,
        partNumberCustomer: '',
        component: '',
        partName: null,
        material: '',
        unit: '',
        us: null,
        option: null,
        taxName: null,
        salePrice: null
      };
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          switch (key) {
            case 'A':
              productImport.no = item[key];
              break;
            case 'B':
              productImport.saleType = item[key];
              break;
            case 'C':
              productImport.carModel = item[key];
              break;
            case 'D':
              productImport.carModelDr = item[key];
              break;
            case 'E':
              productImport.partNumber = item[key];
              break;
            case 'F':
              productImport.partNumberCustomer = item[key];
              break;
            case 'G':
              productImport.component = item[key];
              break;
            case 'H':
              productImport.partName = item[key];
              break;
            case 'I':
              productImport.material = item[key];
              break;
            case 'J':
              productImport.unit = item[key];
              break;
            case 'K':
              productImport.us = item[key];
              break;
            case 'L':
              productImport.option = item[key];
              break;
            case 'M':
              productImport.taxName = item[key];
              break;
            case 'N':
              // productImport.salePrice = item[key];
              productImport.salePrice = !isNaN(parseFloat(item[key])) ? parseFloat(item[key]) : null;
              break;
          }
        }
      }
      productsImport.push(productImport);
    }
    this.objectPriceList = productsImport;

    return productsImport;
  }

  getCustomers() {
    this.spinner.show();
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        this.customerObj.value = this.action === Action.Edit ? this.priceList.customerId : null;
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
    this.clearFile();
  }

  getProjects() {
    this.spinner.show();
    this.projectsService.getProjects().subscribe(
      data => {
        this.listProjects = data;
        if (this.action === Action.Edit) {
          if (this.priceList.projectId !== null) {
            this.projectObj.value = this.priceList.projectId;
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
    this.clearFile();
    this.listCustomersProject = [];
    const projectValue = this.projectObj.value;
    if (projectValue !== null) {
      this.getProjectCustomers(projectValue);
    }
  }

  getProjectCustomers(projectId) {
    this.spinner.show();
    this.projectCustomerService.getProjectCustomers(projectId).subscribe(
      data => {
        this.listCustomersProject = data;
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
        this.currencyObj.value = this.action === Action.Edit ? this.priceList.currencyId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCurrencies: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listCurrencies, query);
  }

  getTaxes() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getProducts() {
    this.spinner.show();
    this.productService.getProducts().subscribe(
      data => {
        this.listProducts = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  saveForm() {
    this.submitted = true;

    if (this.formPriceList.invalid) {
      return;
    }

    if (this.listPrice.length === 0) {
      this.alertMessageService.warningMessage('Debe agregar al menos 1 registro a la lista de precios.');
      return;
    }

    if (this.errorsCount > 0) {
      this.alertMessageService.warningMessage('La lista de precios tiene errores favor de validar.');
      return;
    }

    for (const price of this.listPrice) {

      if (!isNaN(price.taxName)) {
        price.taxName = null;
      }

      if (price.taxName !== null) {

        if (!this.listTaxes.some(o => o.name === price.taxName)) {
          this.alertMessageService.warningMessage(`Debe agregar un impuesto válido en el registro No. ${price.no}.`);
          return;
        } else {
          price.taxId = this.listTaxes.filter(o => o.name === price.taxName.trim())[0].id;
        }
      }
    }

    const priceListSave: any = {};

    priceListSave.id = this.priceList.id;
    priceListSave.priceTypeId = this.priceList.priceTypeId;
    priceListSave.customerId = this.priceList.priceTypeId === this.priceTypeCustomer ? this.priceList.customerId : null;
    priceListSave.projectId = this.priceList.priceTypeId === this.priceTypeProject ? this.priceList.projectId : null;
    priceListSave.currencyId = this.priceList.currencyId;
    priceListSave.name = this.priceList.name;
    priceListSave.startDate =
      moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    priceListSave.endDate =
      moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    priceListSave.notes = this.priceList.notes;
    priceListSave.createBy = this.currentUser.userName;

    const detailArray = [];
    for (const price of this.listPrice) {
      detailArray.push({
        id: price.id,
        no: price.no,
        saleType: price.saleType,
        carModel: price.carModel,
        carModelDr: price.carModelDr,
        partNumber: price.partNumber,
        partNumberCustomer: price.partNumberCustomer,
        component: price.component,
        partName: price.partName,
        material: price.material,
        unit: price.unit,
        us: !isNaN(parseInt(price.stdPack, 0)) ? parseInt(price.stdPack, 0) : 0,
        option: !isNaN(parseFloat(price.stdPack)) ? parseFloat(price.stdPack) : 0,
        taxId: price.taxId,
        salePrice: !isNaN(parseFloat(price.salePrice)) ? parseFloat(price.salePrice) : 0
      });
    }
    priceListSave.detail = detailArray;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.priceHeaderService.savePrice(priceListSave).subscribe(data => {
          this.alertMessageService.successMessage('Lista de Precios guardada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.priceHeaderService.updatePrice(priceListSave).subscribe(data => {
          this.alertMessageService.successMessage('Lista de Precios editada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  clearFile() {
    this.listPrice = [];
    this.listPriceTable = [];
    this.errorsCount = 0;
    this.collectionSize = 0;
    this.fileNamePriceListImported = '';
    this.fileUploadPriceListImported.nativeElement.value = '';
  }

  downloadTemplate() {
    this.spinner.show();
    this.downloadFileService.getTemplate(Template.TemplatePrice).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `Plantilla_Precios.xlsx`);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  dateSelectStart() {
    const startDate = moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD');
    const endDate = moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD');

    if (startDate > endDate) {
      this.startDate = this.calendar.getToday();
      this.alertMessageService.warningMessage(`La Fecha de Inicio debe ser menor o igual a la Fecha de Fin.`);
    }
  }

  dateSelectEnd() {
    const startDate = moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD');
    const endDate = moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD');

    if (endDate < startDate) {
      this.endDate = this.calendar.getToday();
      this.alertMessageService.warningMessage(`La Fecha de Fin debe ser mayor o igual a la Fecha de Inicio.`);
    }
  }

  addNewItem() {
    this.newItem = true;
  }

  cancelItemAdd() {
    this.newItemAdd = {
      no: 0,
      saleType: '',
      carModel: '',
      carModelDr: '',
      partNumber: '',
      partNumberCustomer: '',
      component: '',
      partName: '',
      material: '',
      unit: '',
      us: 0,
      option: 0,
      taxName: '',
      salePrice: 0
    };
    this.newItem = false;
  }

  saveItemAdd() {
    this.submittedItemAdd = true;

    if (this.listPrice.length === 0) {
      this.alertMessageService.warningMessage(`Debe seleccionar una lista de precios.`);
      return;
    }

    if (this.listPrice.some(item => item.partNumber === this.newItemAdd.partNumber)) {
      this.alertMessageService.warningMessage(
        `El No. de Parte <strong>${this.newItemAdd.partNumber}</strong> ya esta agregado en la remisión.`
      );
      this.newItemAdd.partNumber = '';
      return;
    }

    this.listPrice.push(this.newItemAdd);
    this.collectionSize = this.listPrice.length;
    this.refreshItems();
    this.newItem = false;
    this.newItemAdd = {
      no: 0,
      saleType: '',
      carModel: '',
      carModelDr: '',
      partNumber: '',
      partNumberCustomer: '',
      component: '',
      partName: '',
      material: '',
      unit: '',
      us: 0,
      option: 0,
      taxName: '',
      salePrice: 0
    };
  }

  editItem(item, index: number) {
    this.itemEdit = { ...item };
    this.listPriceTable[index].inedit = true;
  }

  deleteItem(item, index: number) {
    this.listPriceTable.splice(index, 1);
    const indexElement = this.listPrice.findIndex(el => el.no === item.no);
    this.listPrice.splice(indexElement, 1);
    this.collectionSize = this.listPrice.length;
    this.refreshItems();
  }

  saveItem(item, index: number) {
    this.submittedItemAdd = true;
    const indexElement = this.listPrice.findIndex(el => el.no === item.no);
    const newListPrice = [...this.listPrice];
    newListPrice[indexElement] = { ...newListPrice[indexElement], ...item };
    this.listPrice = newListPrice;
    this.listPriceTable[index].inedit = false;
  }

  cancelItem(index: number) {
    this.listPriceTable[index] = { ...this.itemEdit };
    this.itemEdit = {};
    this.listPriceTable[index].inedit = false;
  }

  selectItem(index: number) {
    this.rowSelected = index;
  }

  deselectItem(index: number) {
    this.rowSelected = -1;
  }

  refreshItems() {
    this.pageSize = parseInt(this.pageSize.toString(), 0);
    const totalPages = Math.round((this.collectionSize / this.pageSize));
    if (this.page > totalPages) {
      this.page = 1;
    }
    this.listPriceTable = this.listPrice.map((price, i) => ({ id: i + 1, ...price }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  validationItems() {
    this.errorsCount = 0;

    let customerId: any;
    switch (this.priceList.priceTypeId) {
      case 1:
        customerId = this.customerObj.value;
        break;
      case 2:
        if (this.listCustomersProject.length > 0) {
          customerId = this.listCustomersProject[0].customerId;
        } else {
          customerId = null;
        }
        break;
    }

    if (customerId === null) {
      this.clearFile();
      this.alertMessageService.warningMessage(`Debe seleccionar un Cliente o un Proyecto.`);
      return;
    }

    for (const price of this.listPrice) {

      if (price.carModel === null) {
        price.carModelError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.carModel === null) {
        price.carModelError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.partNumber !== null) {
        if (!this.listProducts.some(o => o.partNumber === price.partNumber)) {
          price.partNumberError = `Producto no existe.`;
          this.errorsCount += 1;
        } else {
          const product = this.listProducts.filter(o => o.partNumber === price.partNumber && o.customerId === customerId)[0];
          if (!product) {
            price.partNumberError = `Producto no existe.`;
            this.errorsCount += 1;
          }
        }
      } else {
        price.partNumberError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.partName === null) {
        price.partNameError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (price.taxName !== null) {
        if (!this.listTaxes.some(o => o.name === price.taxName)) {
          price.priceError = `Impuesto inválido.`;
          this.errorsCount += 1;
        }
      } else {
        price.priceError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      price.salePrice = !isNaN(parseFloat(price.salePrice)) ? parseFloat(price.salePrice) : null;

      if (price.salePrice === null) {
        price.salePriceError = `Dato requerido.`;
        this.errorsCount += 1;
      } else if (price.salePrice === 0) {
        price.salePriceError = `Debe ser mayor a 0.`;
        this.errorsCount += 1;
      }

    }
  }

}
