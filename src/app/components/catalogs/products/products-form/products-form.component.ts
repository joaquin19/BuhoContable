import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';

import { Action } from '@app/core/enums';
import { AlertMessageService, UnitMeasureService, SessionService, CustomerService } from '@app/core/services';
import { ProductTypeService } from '@app/core/services/product-type.service';
import { ProductService } from '../../../../core/services/product.service';
import { ProductLevelService } from '../../../../core/services/product-level.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  public action: Action;

  @ViewChild('formProduct', { static: false })
  public formProduct: NgForm;
  @ViewChild('productTypeObj', { static: false })
  public productTypeObj: DropDownListComponent;
  @ViewChild('unitsMeasureObj', { static: false })
  public unitsMeasureObj: DropDownListComponent;
  @ViewChild('productLevelObj', { static: false })
  public productLevelObj: DropDownListComponent;
  @ViewChild('customerObj', { static: false })
  public customerObj: DropDownListComponent;
  @ViewChild('selectall')
  public checkboxObj: CheckBoxComponent;
  @ViewChild('dropdown')
  public dropdownObj: CheckBoxComponent;
  @ViewChild('select')
  public reorderObj: CheckBoxComponent;

  public mode: string;
  public filterPlaceholder: string;
  public submitted: boolean;
  public titleHeader: string;
  public listHeaders: any;
  public listProductTypes: any;
  public listUnitsMeasure: any;
  public listCustomers: any;
  public listProductLevel: any;
  public product: any;
  public maxLengthDescription: number;
  public pageRedirect: string;
  public currentUser: any;
  public tax: string[];
  public changeToImport: boolean;
  public buttonImport: string;
  public showImport: boolean;

  /**** MultiSelect DropDown****/
  // set the placeholder to the MultiSelect input
  public checkWaterMark: string;
  // set the MultiSelect popup height
  public popHeight: string;
  public selectedItems: any;
  public listProducts: any;
  // public value: string[];
  /**** MultiSelect DropDown fin****/

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private productLevelService: ProductLevelService,
    private customerService: CustomerService,
    private unitMeasureService: UnitMeasureService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
  ) {
    this.initObjects();
    this.buttonImport = 'Importar Excel';
    this.pageRedirect = '/catalogs/products';
    this.submitted = false;
    this.titleHeader = '';
    this.listHeaders = [];
    this.listProductTypes = [];
    this.listUnitsMeasure = [];
    this.listCustomers = [];
    this.listProductLevel = [];
    this.listProducts = [];
    this.product = {
      createBy: '',
      detail: [
        {
          id: 0,
          no: 0,
          productTypeId: null,
          customerId: null,
          carModel: '',
          carModelDr: '',
          partNumber: '',
          partNumberCustomer: '',
          productLevelId: null,
          component: '',
          partName: '',
          grade: '',
          msSpec: '',
          supplier: '',
          use: '',
          cTime: 0,
          cv: 0,
          weight: 0,
          actualWeight: 0,
          ttlKg: null,
          unitMeasureId: null,
          unitSale: null,
          option: null,
          remark: ''
        }
      ]
    };
    this.maxLengthDescription = 200;
    this.action = Action.None;
    this.mode = 'CheckBox';
    this.checkWaterMark = 'Seleccione';
    this.popHeight = '350px';
    this.changeToImport = false;
    this.showImport = true;
  }

  ngOnInit(): void {
    this.mode = 'CheckBox';
    this.filterPlaceholder = 'Buscar Impuestos';
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  onClickImport() {
    this.changeToImport = !this.changeToImport;
    this.buttonImport = this.changeToImport ? 'Agregar Producto' : 'Importar Excel';
  }

  initObjects() {
    this.product = {
      createBy: '',
      detail: [
        {
          id: 0,
          no: 0,
          productTypeId: null,
          customerId: null,
          carModel: '',
          carModelDr: '',
          partNumber: '',
          partNumberCustomer: '',
          productLevelId: null,
          component: '',
          partName: '',
          grade: '',
          msSpec: '',
          supplier: '',
          use: '',
          cTime: 0,
          cv: 0,
          weight: 0,
          actualWeight: 0,
          ttlKg: 0,
          unitMeasureId: null,
          unitSale: 0,
          option: 0,
          remark: ''
        }
      ]
    };
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addProduct':
            this.showImport = true;
            this.titleHeader = 'Agregar Producto';
            this.initObjects();
            this.action = Action.Create;
            break;
          case 'editProduct':
            this.showImport = false;
            this.titleHeader = 'Editar Producto';
            this.action = Action.Edit;
            this.getProductById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getProductTypes();
    this.getUnitsMeasure();
    this.getProductLevel();
    this.getCustomers();
    this.getProducts();
  }

  getProductById(productId) {
    this.spinner.show();
    this.productService.getProductById(productId).subscribe(
      data => {
        this.product = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getProductTypes() {
    this.spinner.show();
    this.productTypeService.getProductTypes().subscribe(
      data => {
        this.listProductTypes = data;
        this.productTypeObj.value = this.action === Action.Edit ? this.product.productTypeId : null;
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
        this.customerObj.value = this.action === Action.Edit ? this.product.customerId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getProductLevel() {
    this.spinner.show();
    this.productLevelService.getProductTypes().subscribe(
      data => {
        this.listProductLevel = data;
        this.productLevelObj.value = this.action === Action.Edit ? this.product.productLevelId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getUnitsMeasure() {
    this.spinner.show();
    this.unitMeasureService.getUnitsMeasure().subscribe(
      data => {
        this.listUnitsMeasure = data;
        this.unitsMeasureObj.value = (this.action === Action.Edit ? this.product.unitMeasureId : null);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringUnitsMeasure: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listUnitsMeasure, query);
  }

  filteringCustomer: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomers, query);
  }

  filteringProductLevel: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listProductLevel, query);
  }

  filteringProductTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listProductTypes, query);
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

    const newPartNumber = this.formProduct.controls?.partNumber;
    const newPartNumberCustomer = this.formProduct.controls?.partNumberCustomer;
    const validNoExist = this.listProducts.find(item => item.no === Number(this.product.no));
    const validPartNo = this.listProducts.find(item => item.partNumber === this.product.partNumber);
    const validPartNoCust = this.listProducts.find(item => item.partNumberCustomer === this.product.partNumberCustomer);



    if ((validNoExist !== undefined && this.product.customerId === undefined) ) {
      this.alertMessageService.warningMessage(`El No ${this.product.no} ya existe`);
      this.product.no = null;
      return;
    } else if (validPartNo !== undefined && this.product.customerId === undefined) {
      this.alertMessageService.warningMessage(`El No ${this.product.partNumber} de parte ya existe`);
      this.product.partNumber = null;
      return;
    } else if (validPartNoCust !== undefined && this.product.customerId === undefined) {
      this.alertMessageService.warningMessage(`El No ${this.product.partNumberCustomer} de parte de cliente ya existe`);
      this.product.partNumberCustomer = null;
      return;
    }

    if (this.formProduct.invalid && this.formProduct.controls.customerId.status === 'INVALID' &&
       ((newPartNumber?.status === 'INVALID' && newPartNumberCustomer?.status === 'INVALID') ||
       (newPartNumber?.status === 'VALID' && newPartNumberCustomer?.status === 'INVALID') ||
       (newPartNumber?.status === 'INVALID' && newPartNumberCustomer?.status === 'VALID'))) {
      return;
    }

    const productSave: any = {};

    productSave.createBy = this.currentUser.userName;
    productSave.detail = [{
      id: this.product.id !== undefined ? this.product.id : 0,
      no: this.product.no,
      productTypeId: this.product.productTypeId,
      customerId: this.product.customerId,
      carModel: this.product.carModel,
      carModelDr: this.product.carModelDr,
      partNumber: this.product.partNumber,
      partNumberCustomer: this.product.partNumberCustomer,
      productLevelId: this.product.productLevelId,
      component: this.product.component,
      partName: this.product.partName,
      grade: this.product.grade,
      msSpec: this.product.msSpec,
      supplier: this.product.supplier,
      use: this.product.use,
      cTime: this.product.cTime,
      cv: this.product.cv,
      weight: this.product.weight,
      actualWeight: this.product.actualWeight,
      ttlKg: this.product.ttlKg,
      unitMeasureId: this.product.unitMeasureId,
      unitSale: this.product.unitSale,
      option: this.product.option,
      remark: this.product.remark,
    }];

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.productService.saveProduct(productSave).subscribe(data => {
          this.alertMessageService.successMessage('Producto guardado correctamente.');
          this.spinner.hide();
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.productService.updateProduct(productSave).subscribe(data => {
          this.alertMessageService.successMessage('Producto editado correctamente.');
          this.spinner.hide();
          this.router.navigate([this.pageRedirect]);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

}
