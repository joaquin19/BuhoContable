import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, GridLine, ExcelExportProperties
} from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { ProductService } from '../../../../core/services/product.service';
import { ProductsModalComponent } from '../products-modal/products-modal.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @ViewChild('gridProducts', { static: false })
  public gridProducts: GridComponent;

  public listProducts: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public actionForm = Action;
  public currentUser: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private productService: ProductService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.listProducts = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'no', header: 'No', width: 100, textAlign: 'Center' },
      { field: 'productTypeName', header: 'Tipo de Producto', width: 250, textAlign: 'Left' },
      { field: 'customerName', header: 'Cliente', width: 250, textAlign: 'Left' },
      { field: 'carModel', header: 'Car/Mod', width: 250, textAlign: 'Left' },
      { field: 'carModelDr', header: 'Car/ModDr', width: 200, textAlign: 'Left' },
      { field: 'partNumber', header: 'Parte No.', width: 200, textAlign: 'Left' },
      { field: 'partNumberCustomer', header: 'Cliente Parte No.', width: 200, textAlign: 'Left' },
      { field: 'productLevelName', header: 'Nivel de Producto', width: 200, textAlign: 'Left' },
      { field: 'component', header: 'Componente', width: 150, textAlign: 'Left' },
      { field: 'partName', header: 'Parte', width: 250, textAlign: 'Left' },
      { field: 'grade', header: 'Grado', width: 200, textAlign: 'Left' },
      { field: 'msSpec', header: 'Ms/Spec', width: 250, textAlign: 'Left' },
      { field: 'supplier', header: 'Proveedor', width: 200, textAlign: 'Left' },
      { field: 'use', header: 'Uso', width: 150, textAlign: 'Left' },
      { field: 'cTime', header: 'C/Time', width: 150, textAlign: 'Left' },
      { field: 'cv', header: 'C/V', width: 150, textAlign: 'Left' },
      { field: 'weight', header: 'Peso', width: 150, textAlign: 'Left' },
      { field: 'actualWeight', header: 'Peso Actual', width: 150, textAlign: 'Left' },
      { field: 'ttlKg', header: 'Ttl/Kg', width: 150, textAlign: 'Left' },
      { field: 'unitMeasureName', header: 'Unidad de Medida', width: 200, textAlign: 'Left' },
      { field: 'unitSale', header: 'Unidad de Venta', width: 200, textAlign: 'Left' },
      { field: 'option', header: 'Opción', width: 150, textAlign: 'Left' },
      { field: 'remark', header: 'Observaciones', width: 250, textAlign: 'Left' }
    ];

    this.getProducts();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogo de Productos.xlsx'
    };
    this.gridProducts.excelExport(excelExportProperties);
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

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(ProductsModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
    });
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar el producto <strong>${item.no}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.deleteProduct(item.id, this.currentUser.userName);
      }
    });
  }

  deleteProduct(productSave, deletedBy) {
    this.spinner.show();
    this.productService.deleteProduct(productSave, deletedBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Producto eliminado correctamente.');
        this.getProducts();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
