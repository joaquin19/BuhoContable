import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, CustomerService } from '@app/core/services';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { PreInvoiceType } from '../../../../core/enums/pre-invoice-type';

@Component({
  selector: 'app-pre-invoice-form',
  templateUrl: './pre-invoice-form.component.html',
  styleUrls: ['./pre-invoice-form.component.scss']
})
export class PreInvoiceFormComponent implements OnInit {

  @ViewChild('formPreInvoice', { static: false })
  public formPreInvoice: NgForm;
  @ViewChild('customerObj', { static: false })
  public customerObj: DropDownListComponent;
  @ViewChild('supportObj', { static: false })
  public supportObj: DropDownListComponent;
  @ViewChild('outSupportObj', { static: false })
  public outSupportObj: DropDownListComponent;
  @ViewChild('cfditObj', { static: false })
  public cfditObj: DropDownListComponent;

  public titleHeader: string;
  public actionForm: Action;
  public submitted: boolean;
  public preInvoice: any;
  public pageRedirect: string;
  public listCustomers: any;
  public listSupport: any;
  public listOutSupport: any;
  public listCFDI: any;
  public typesFiles: string[];
  public files: any;
  public preInvoiceTypeSupport: PreInvoiceType;
  public preInvoiceTypeOutSupport: PreInvoiceType;
  public newItemAdd: any;
  public newItem: boolean;
  public currentUser: any;
  public showImport: boolean;
  public submittedItemAdd: boolean;
  public columnsHeader: any;
  public rowSelected: number;
  public itemsPage: any;
  public page: number;
  public pageSize: number;
  public itemEdit: any;
  public collectionSize: number;
  public listPreInvoiceTable: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private customerService: CustomerService,
  ) {
    this.initObjects();
    this.titleHeader = '';
    this.listPreInvoiceTable = [];
    this.submitted = false;
    this.actionForm = Action.None;
    this.pageRedirect = '/invoicing/pre-invoices';
    this.listCustomers = [];
    this.listSupport = [];
    this.listOutSupport = [];
    this.listCFDI = [];
    this.typesFiles = ['.xls', '.xlsx'];
    this.preInvoiceTypeSupport = PreInvoiceType.Support;
    this.preInvoiceTypeOutSupport = PreInvoiceType.OutSupport;
    this.newItemAdd = {
      no: 0,
      quantity: 0,
      partNumber: '',
      partName: '',
      claveUnitMeasure: '',
      claveProductService: ''
    };
    this.submittedItemAdd = false;
    this.itemEdit = {};
    this.newItem = false;
    this.columnsHeader = [
      { text: 'NO', classStyle: 'wf-xs' },
      { text: 'CANTIDAD', classStyle: 'wf-md' },
      { text: 'NO. PARTE', classStyle: 'wf-md' },
      { text: 'NOMBRE DE PARTE', classStyle: 'wf-xxxlg' },
      { text: 'CLAVE UNIDAD DE MEDIDA', classStyle: 'wf-md' },
      { text: 'CLAEV PRODUCTO SERV.', classStyle: 'wf-md' },
      { text: '', classStyle: 'wf-md' }
    ];
  }

  ngOnInit(): void {
    this.showForm();
  }

  initObjects() {
    this.preInvoice = {
      id: 0,
      supportTypeId: 1,
      supportId: null,
      comprobante: '',
      payForm: '',
      payMethod: '',
      payCondition: '',
      order: '',
      observations: '',
      pricelistId: null,
      customerId: null,
      preInvoiceId: null,
      createBy: '',
      createdOn: '',
    };
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addPreInvoice':
            this.titleHeader = 'Agregar Pre-Factura';
            this.preInvoice = {
              id: 0,
              supportTypeId: 1,
              supportId: null,
              comprobante: '',
              payForm: '',
              payMethod: '',
              payCondition: '',
              order: '',
              observations: '',
              pricelistId: null,
              customerId: null,
              preInvoiceId: null,
              createBy: '',
              createdOn: '',
            };
            this.actionForm = Action.Create;
            break;
          case 'editPreInvoice':
            this.titleHeader = 'Editar Pre-Factura';
            this.actionForm = Action.Edit;
            this.preInvoice = {
              id: 0,
              supportTypeId: 1,
              supportId: null,
              comprobante: '',
              payForm: '',
              payMethod: '',
              payCondition: '',
              order: '',
              observations: '',
              pricelistId: null,
              customerId: null,
              preInvoiceId: null,
              createBy: '',
              createdOn: '',
            };
            // this.getCustomerById(params.id);
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
  }

  changepreInvoiceType() {
    switch (this.preInvoice.preInvoiceId) {
      case this.preInvoiceTypeSupport:
        this.supportObj.value = null;
        break;
      case this.preInvoiceTypeOutSupport:
        this.outSupportObj.value = null;
        break;
    }

  }

  getCustomers() {
    // this.spinner.show();
    // this.customerService.getCustomer().subscribe(
    //   data => {
    //     this.listCustomers = data;
    //     this.customerObj.value = this.actionForm === Action.Edit ? this.preInvoice.customerId : null;
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.alertMessageService.errorMessage(error.message);
    //   });
  }

  filteringCustomer: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomers, query);
  }

  filteringSupport: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listSupport, query);
  }

  filteringOutSupport: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listOutSupport, query);
  }

  filteringCFDI: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCFDI, query);
  }

  addNewItem() {
    this.newItem = true;
  }

  cancelItemAdd() {
    this.newItemAdd = {
      no: 0,
      shipTo: null,
      saleType: null,
      partNumber: 0,
      partName: '',
      each: '',
      cubicMeter: '',
      minimumSale: '',
      stdPack: '',
      box: '',
      boxSize: '',
      customer: '',
      taxName: '',
      salePrice: ''
    };
    this.newItem = false;
  }

  saveForm() {
    this.submitted = true;

    // if (this.formPriceList.invalid) {
    //   return;
    // }

    // if (this.listPrice.length === 0) {
    //   this.alertMessageService.warningMessage('Debe agregar al menos 1 registro a la lista de precios.');
    //   return;
    // }

    // for (const price of this.listPrice) {

    //   if (!isNaN(price.taxName)) {
    //     price.taxName = null;
    //   }

    //   if (price.taxName !== null) {

    //     if (!this.listTaxes.some(o => o.name === price.taxName)) {
    //       this.alertMessageService.warningMessage(`Debe agregar un impuesto válido en el registro No. ${price.no}.`);
    //       return;
    //     } else {
    //       price.taxId = this.listTaxes.filter(o => o.name === price.taxName.trim())[0].id;
    //     }
    //   }
    // }

    // const priceListSave: any = {};

    // priceListSave.id = this.priceList.id;
    // priceListSave.priceTypeId = this.priceList.priceTypeId;
    // priceListSave.customerId = this.priceList.priceTypeId === this.priceTypeCustomer ? this.priceList.customerId : null;
    // priceListSave.projectId = this.priceList.priceTypeId === this.priceTypeProject ? this.priceList.projectId : null;
    // priceListSave.currencyId = this.priceList.currencyId;
    // priceListSave.name = this.priceList.name;
    // priceListSave.startDate =
    //   moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    // priceListSave.endDate =
    //   moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    // priceListSave.notes = this.priceList.notes;
    // priceListSave.createBy = this.currentUser.userName;

    // const detailArray = [];
    // for (const price of this.listPrice) {
    //   detailArray.push({
    //     id: price.id,
    //     no: price.no,
    //     shipTo: price.shipTo,
    //     saleType: price.saleType,
    //     partNumber: price.partNumber,
    //     partName: price.partName,
    //     each: !isNaN(parseFloat(price.each)) ? parseFloat(price.each) : 0,
    //     cubicMeter: !isNaN(parseFloat(price.cubicMeter)) ? parseFloat(price.cubicMeter) : 0,
    //     minimumSale: !isNaN(parseFloat(price.minimumSale)) ? parseFloat(price.minimumSale) : 0,
    //     stdPack: !isNaN(parseFloat(price.stdPack)) ? parseFloat(price.stdPack) : 0,
    //     box: price.box,
    //     boxSize: price.boxSize,
    //     customer: price.customer,
    //     taxId: price.taxId,
    //     salePrice: !isNaN(parseFloat(price.salePrice)) ? parseFloat(price.salePrice) : 0
    //   });
    // }
    // priceListSave.detail = detailArray;

    // this.spinner.show();
    // switch (this.action) {
    //   case Action.Create:
    //     this.priceHeaderService.savePrice(priceListSave).subscribe(data => {
    //       this.alertMessageService.successMessage('Lista de Precios guardada correctamente.');
    //       this.router.navigate([this.pageRedirect]);
    //       this.spinner.hide();
    //     }, error => {
    //       this.alertMessageService.errorMessage(error.message);
    //     });
    //     break;
    //   case Action.Edit:
    //     this.priceHeaderService.updatePrice(priceListSave).subscribe(data => {
    //       this.alertMessageService.successMessage('Lista de Precios editada correctamente.');
    //       this.router.navigate([this.pageRedirect]);
    //       this.spinner.hide();
    //     }, error => {
    //       this.alertMessageService.errorMessage(error.message);
    //     });
    //     break;
    // }
  }

  saveItemAdd() {
    // this.submittedItemAdd = true;

    // if (this.listPrice.length === 0) {
    //   this.alertMessageService.warningMessage(`Debe seleccionar una lista de precios.`);
    //   return;
    // }

    // if (this.listPrice.some(item => item.no === Number(this.newItemAdd.no))) {
    //   this.alertMessageService.warningMessage(
    //     `El No <strong>${this.newItemAdd.no}</strong> ya esta agregado en la remisión.`
    //   );
    //   this.newItemAdd.no = '';
    //   return;
    // }

    // if (this.listPrice.some(item => item.saleType === this.newItemAdd.saleType)) {
    //   this.alertMessageService.warningMessage(
    //     `El Tipo <strong>${this.newItemAdd.saleType}</strong> ya esta agregado en la remisión.`
    //   );
    //   this.newItemAdd.saleType = '';
    //   return;
    // }

    // if (this.listPrice.some(item => item.partNumber === this.newItemAdd.partNumber)) {
    //   this.alertMessageService.warningMessage(
    //     `El No. de Parte <strong>${this.newItemAdd.partNumber}</strong> ya esta agregado en la remisión.`
    //   );
    //   this.newItemAdd.partNumber = '';
    //   return;
    // }

    // this.listPrice.push(this.newItemAdd);
    // this.collectionSize = this.listPrice.length;
    // this.refreshItems();
    // this.newItem = false;
  }

  editItem(item, index: number) {
    // this.itemEdit = { ...item };
    // this.listPriceTable[index].inedit = true;
  }

  deleteItem(item, index: number) {
    // this.listPriceTable.splice(index, 1);
    // const indexElement = this.listPrice.findIndex(el => el.no === item.no);
    // this.listPrice.splice(indexElement, 1);
    // console.log('this.listPrice', this.listPrice);
    // this.collectionSize = this.listPrice.length;
    // this.refreshItems();
  }

  saveItem(item, index: number) {
    // this.submittedItemAdd = true;
    // console.log('itemSave1', item);
    // const indexElement = this.listPrice.findIndex(el => el.no === item.no);
    // const newListPrice = [...this.listPrice];
    // newListPrice[indexElement] = { ...newListPrice[indexElement], ...item };
    // this.listPrice = newListPrice;
    // this.listPriceTable[index].inedit = false;
  }

  cancelItem(index: number) {
    // this.listPriceTable[index] = { ...this.itemEdit };
    // this.itemEdit = {};
    // this.listPriceTable[index].inedit = false;
  }

  selectItem(index: number) {
    // this.rowSelected = index;
  }

  deselectItem(index: number) {
    // this.rowSelected = -1;
  }

  refreshItems() {
    // this.pageSize = parseInt(this.pageSize.toString(), 0);
    // const totalPages = Math.round((this.collectionSize / this.pageSize));
    // if (this.page > totalPages) {
    //   this.page = 1;
    // }
    // this.listPriceTable = this.listPrice.map((price, i) => ({ id: i + 1, ...price }))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
