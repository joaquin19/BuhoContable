import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSettingsModel, FilterSettingsModel, GridComponent, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { Action, Template } from '@app/core/enums';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, SessionService, ProductService, DownloadFileService } from '@app/core/services';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.scss']
})
export class ProductsImportComponent implements OnInit {

  @Input() listProductTypes: any;
  @Input() listUnitsMeasure: any;
  @Input() listCustomers: any;
  @Input() listProductLevel: any;

  @ViewChild('gridProductsImport', { static: false })
  public gridProductsImport: GridComponent;
  @ViewChild('fileUploadProductImported', { static: false })
  public fileUploadProductImported: ElementRef;

  public action: Action;
  public submitted: boolean;
  public listProductsImport: any;
  public listProductTable: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public currentUser: any;
  public editOptions: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public typesFiles: string[];
  public pageRedirect: string;
  public fileNameProductImported: string;
  public newItemAdd: any;
  public newItem: boolean;
  public itemEdit: any;
  public submittedItemAdd: boolean;
  public columnsHeader: any;
  public rowSelected: number;
  public page: number;
  public pageSize: number;
  public collectionSize: number;
  public errorsCount: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSettings: ProjectSettings,
    private sessionService: SessionService,
    private alertMessageService: AlertMessageService,
    private productService: ProductService,
    private downloadFileService: DownloadFileService,
    private spinner: NgxSpinnerService
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.editOptions = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Normal' };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.typesFiles = ['.xls', '.xlsx'];
    this.action = Action.None;
    this.submitted = false;
    this.pageRedirect = '/catalogs/products';
    this.listProductsImport = [];
    this.listProductTable = [];
    this.fileNameProductImported = '';
    this.newItemAdd = {
      no: null,
      productType: '',
      customer: '',
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
      cTime: null,
      cv: null,
      weight: null,
      actualWeight: null,
      ttlKg: null,
      unitMeasure: '',
      unitSale: null,
      option: null,
      remark: ''
    };
    this.submittedItemAdd = false;
    this.itemEdit = {};
    this.newItem = false;
    this.listProductTypes = [];
    this.listUnitsMeasure = [];
    this.listCustomers = [];
    this.listProductLevel = [];

    this.columnsHeader = [
      { text: 'NO', classStyle: 'wf-xs' },
      { text: 'TIPO', classStyle: 'wf-sm' },
      { text: 'CLIENTE', classStyle: 'wf-md' },
      { text: 'MODELO', classStyle: 'wf-md' },
      { text: 'MODELO DR', classStyle: 'wf-md' },
      { text: 'NO. PARTE', classStyle: 'wf-md' },
      { text: 'NO. PARTE CLIENTE', classStyle: 'wf-md' },
      { text: 'NIVEL PRODUCTO', classStyle: 'wf-md' },
      { text: 'COMPONENTE', classStyle: 'wf-md' },
      { text: 'NOMBRE DE PARTE', classStyle: 'wf-xxxlg' },
      { text: 'GRADO', classStyle: 'wf-sm' },
      { text: 'MS ESPECIFICO', classStyle: 'wf-lg' },
      { text: 'PRROVEEDOR', classStyle: 'wf-sm' },
      { text: 'USO', classStyle: 'wf-sm' },
      { text: 'C/TIEMPO', classStyle: 'wf-sm' },
      { text: 'C/V', classStyle: 'wf-xs' },
      { text: 'PESO', classStyle: 'wf-sm' },
      { text: 'PESO ACTUAL', classStyle: 'wf-md' },
      { text: 'TTL KG', classStyle: 'wf-md' },
      { text: 'UNIDAD DE MEDIDA', classStyle: 'wf-md' },
      { text: 'UNIDAD DE VENTA', classStyle: 'wf-md' },
      { text: 'OPCION', classStyle: 'wf-sm' },
      { text: 'OBSERVACIONES', classStyle: 'wf-sm' },
      // { text: '', classStyle: 'wf-md' }
    ];
    this.rowSelected = -1;
    this.itemsPage = this.projectSettings.itemsPage();
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;
    this.errorsCount = 0;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  onReturn() {
    this.router.navigate([this.pageRedirect]).then();
  }

  onChange(event: Event): void {
    this.listProductsImport = [];
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadProductImported.nativeElement.value = '';
      return;
    }

    this.fileNameProductImported = fileName;

    this.spinner.show();
    const reader = new FileReader();

    reader.onload = (e) => {
      let data: any = e.target.result;
      data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 'A' });
      if (sheet.length !== 0) {
        const listExcelImport = sheet;
        listExcelImport.splice(0, 2);
        this.listProductsImport = this.setProductsImport(listExcelImport);
        this.validationItems();
        this.collectionSize = this.listProductsImport.length;
        this.refreshItems();
        this.spinner.hide();
      } else {
        this.alertMessageService.warningMessage('El Documento no contiene datos');
      }
    };
    reader.readAsArrayBuffer(file);
    fileInput.value = '';
  }

  setProductsImport(data) {
    const productsImport: any = [];
    for (const item of data) {
      const productImport: any = {
        id: 0,
        no: null,
        productType: null,
        productTypeId: null,
        customer: null,
        carModel: null,
        carModelDr: '',
        partNumber: null,
        partNumberCustomer: '',
        productLevelId: null,
        component: '',
        partName: null,
        grade: '',
        msSpec: '',
        supplier: '',
        use: '',
        cTime: null,
        cv: null,
        weight: null,
        actualWeight: null,
        ttlKg: null,
        unitMeasure: '',
        unitSale: null,
        option: null,
        remark: ''
      };
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          switch (key) {
            case 'A':
              productImport.no = item[key];
              break;
            case 'B':
              productImport.productType = item[key];
              break;
            case 'C':
              productImport.customer = item[key];
              break;
            case 'D':
              productImport.carModel = item[key];
              break;
            case 'E':
              productImport.carModelDr = item[key];
              break;
            case 'F':
              productImport.partNumber = item[key];
              break;
            case 'G':
              productImport.partNumberCustomer = item[key];
              break;
            case 'H':
              productImport.productLevelId = 1;
              break;
            case 'I':
              productImport.productLevelId = 2;
              break;
            case 'J':
              productImport.productLevelId = 3;
              break;
            case 'K':
              productImport.productLevelId = 4;
              break;
            case 'L':
              productImport.productLevelId = 5;
              break;
            case 'M':
              productImport.component = item[key];
              break;
            case 'N':
              productImport.partName = item[key];
              break;
            case 'O':
              productImport.grade = item[key];
              break;
            case 'P':
              productImport.msSpec = item[key];
              break;
            case 'Q':
              productImport.supplier = item[key];
              break;
            case 'R':
              productImport.use = item[key];
              break;
            case 'S':
              productImport.ctime = item[key];
              break;
            case 'T':
              productImport.cv = item[key];
              break;
            case 'U':
              productImport.weight = item[key];
              break;
            case 'V':
              productImport.actualWeight = item[key];
              break;
            case 'W':
              productImport.ttlKg = item[key];
              break;
            case 'X':
              productImport.unitMeasure = item[key];
              break;
            case 'Y':
              productImport.unitSale = item[key];
              break;
            case 'Z':
              productImport.option = item[key];
              break;
            case 'AA':
              productImport.remark = item[key];
              break;
          }
        }
      }
      productsImport.push(productImport);
    }
    return productsImport;
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addProduct':
            this.action = Action.Create;
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
  }

  addNewItem() {
    this.newItem = true;
  }

  cancelItemAdd() {
    this.newItemAdd = {
      no: null,
      productType: null,
      customer: null,
      carModel: null,
      carModelDr: '',
      partNumber: null,
      partNumberCustomer: '',
      productLevelId: null,
      component: '',
      partName: null,
      grade: '',
      msSpec: '',
      supplier: '',
      use: '',
      cTime: null,
      cv: null,
      weight: null,
      actualWeight: null,
      ttlKg: null,
      unitMeasure: '',
      unitSale: null,
      option: null,
      remark: ''
    };
    this.newItem = false;
  }

  saveItemAdd() {
    this.submittedItemAdd = true;

    if (this.listProductsImport.length === 0) {
      this.alertMessageService.warningMessage(`Debe seleccionar una lista de precios.`);
      return;
    }

    if (this.listProductsImport.some(item => item.no === Number(this.newItemAdd.no))) {
      this.alertMessageService.warningMessage(
        `El No <strong>${this.newItemAdd.no}</strong> ya esta agregado en la remisión.`
      );
      this.newItemAdd.no = '';
      return;
    }

    if (this.listProductsImport.some(item => item.partNumber === this.newItemAdd.partNumber)) {
      this.alertMessageService.warningMessage(
        `El No. de Parte <strong>${this.newItemAdd.partNumber}</strong> ya esta agregado en la remisión.`
      );
      this.newItemAdd.partNumber = '';
      return;
    }

    if (this.listProductsImport.some(item => item.partNumberCustomer === this.newItemAdd.partNumberCustomer)) {
      this.alertMessageService.warningMessage(
        `El Tipo <strong>${this.newItemAdd.partNumberCustomer}</strong> ya esta agregado en la remisión.`
      );
      this.newItemAdd.partNumberCustomer = '';
      return;
    }

    this.listProductsImport.push(this.newItemAdd);
    this.collectionSize = this.listProductsImport.length;
    this.refreshItems();
    this.newItem = false;
  }

  editItem(item, index: number) {
    this.itemEdit = { ...item };
    this.listProductTable[index].inedit = true;
  }

  deleteItem(item, index: number) {
    this.listProductTable.splice(index, 1);
    const indexElement = this.listProductsImport.findIndex(el => el.no === item.no);
    this.listProductsImport.splice(indexElement, 1);
    this.collectionSize = this.listProductsImport.length;
    this.refreshItems();
  }

  saveItem(item, index: number) {
    this.submittedItemAdd = true;
    const indexElement = this.listProductsImport.findIndex(el => el.no === item.no);
    const newListProduct = [...this.listProductsImport];
    newListProduct[indexElement] = { ...newListProduct[indexElement], ...item };
    this.listProductsImport = newListProduct;
    this.listProductTable[index].inedit = false;
  }

  cancelItem(index: number) {
    this.listProductTable[index] = { ...this.itemEdit };
    this.itemEdit = {};
    this.listProductTable[index].inedit = false;
  }

  saveImportProducts() {
    this.submitted = true;

    if (this.listProductsImport.length === 0) {
      this.alertMessageService.warningMessage('Debe agregar al menos 1 registro a la lista de productos.');
      return;
    }

    if (this.errorsCount > 0) {
      this.alertMessageService.warningMessage('La lista de productos tiene errores favor de validar.');
      return;
    }

    const productSave: any = {};

    productSave.createBy = this.currentUser.userName;
    const newObject: any = [];

    for (const product of this.listProductsImport) {

      if (product.productType !== null) {
        if (!this.listProductTypes.some(o => o.name === product.productType.trim())) {
          this.alertMessageService.warningMessage(`Debe agregar un tipo de producto válido en el registro No. ${product.no}.`);
          return;
        } else {
          product.productTypeId = this.listProductTypes.filter(o => o.name === product.productType)[0].id;
        }
      }

      if (product.customer !== null) {
        if (!this.listCustomers.some(o => o.name === product.customer.trim())) {
          this.alertMessageService.warningMessage(`Debe agregar un cliente válido en el registro No. ${product.no}.`);
          return;
        } else {
          product.customerId = this.listCustomers.filter(o => o.name === product.customer)[0].id;
        }
      }

      if (product.unitMeasure !== '' && product.unitMeasure !== null) {
        if (!this.listUnitsMeasure.some(o => o.name === product.unitMeasure.trim())) {
          this.alertMessageService.warningMessage(`Debe agregar una unida de medida valida en el registro No. ${product.no}.`);
          return;
        } else {
          product.unitMeasureId = this.listUnitsMeasure.filter(o => o.name === product.unitMeasure)[0].id;
        }
      }

      newObject.push({
        id: product.id,
        no: product.no !== undefined ? product.no : null,
        productTypeId: product.productTypeId !== undefined ? product.productTypeId : null,
        customerId: product.customerId !== undefined ? product.customerId : null,
        carModel: product.carModel !== undefined ? product.carModel : null,
        carModelDr: product.carModelDr !== undefined ? product.carModelDr : null,
        partNumber: product.partNumber !== undefined ? product.partNumber : null,
        partNumberCustomer: product.partNumberCustomer !== undefined ? product.partNumberCustomer : null,
        productLevelId: product.productLevelId !== undefined ? product.productLevelId : null,
        component: product.component !== undefined ? product.component : null,
        partName: product.partName !== undefined ? product.partName : null,
        grade: product.grade !== undefined ? product.grade : null,
        msSpec: product.msSpec !== undefined ? product.msSpec : null,
        supplier: product.supplier !== undefined ? product.supplier : null,
        use: product.use !== undefined ? product.use : null,
        cTime: product.cTime !== undefined ? product.cTime : null,
        cv: product.cv !== undefined ? product.cv : null,
        weight: product.weight !== undefined ? product.weight : null,
        actualWeight: product.actualWeight !== undefined ? product.actualWeight : null,
        ttlKg: product.ttlKg !== undefined ? product.ttlKg : null,
        unitMeasureId: product.unitMeasureId !== undefined ? product.unitMeasureId : null,
        unitSale: product.unitSale !== undefined ? product.unitSale : null,
        option: product.option !== undefined ? product.option : null,
        remark: product.remark !== undefined ? product.remark : null
      });
    }

    productSave.detail = newObject;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.productService.saveProduct(productSave).subscribe(data => {
          this.alertMessageService.successMessage('Lista de Productos guardado correctamente.');
          this.onReturn();
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  clearFile() {
    this.listProductsImport = [];
    this.listProductTable = [];
    this.errorsCount = 0;
    this.collectionSize = 0;
    this.fileNameProductImported = '';
    this.fileUploadProductImported.nativeElement.value = '';
  }

  downloadTemplate() {
    this.spinner.show();
    this.downloadFileService.getTemplate(Template.TemplateProduct).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `Plantilla_Productos.xlsx`);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
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
    this.listProductTable = this.listProductsImport.map((product, i) => ({ id: i + 1, ...product }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  validationItems() {
    this.errorsCount = 0;

    for (const product of this.listProductsImport) {

      if (product.productType !== null) {
        if (!this.listProductTypes.some(o => o.name === product.productType.trim())) {
          product.productTypeError = `Producto inválido.`;
          this.errorsCount += 1;
        }
      } else {
        product.productTypeError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (product.customer !== null) {
        if (!this.listCustomers.some(o => o.name === product.customer.trim())) {
          product.customerError = `Cliente no existe.`;
          this.errorsCount += 1;
        }
      } else {
        product.customerError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (product.carModel === null) {
        product.carModelError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (product.partNumber === null) {
        product.partNumberError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (product.partName === null) {
        product.partNameError = `Dato requerido.`;
        this.errorsCount += 1;
      }

      if (product.unitMeasure !== '' && product.unitMeasure !== null) {
        if (!this.listUnitsMeasure.some(o => o.name === product.unitMeasure.trim())) {
          product.unitMeasureError = `UM invalida.`;
          this.errorsCount += 1;
        }
      }
    }
  }

}
