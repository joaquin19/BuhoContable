import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Action } from '@app/core/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSettings } from '@app/core/constants';
import {
  AlertMessageService, SessionService, SupplierService, BusinessUnitService, PurchaseOrderTypeService,
  CostCenterService, SupplierContactService, PaymentTypeService, PurchaseOrderHeaderService,
  PurchaseOrderDetailService,
  CurrencyService,
  SupplierPaymentTermService,
  SupplierRecordService,
  TaxService
} from '@app/core/services';
import { PurchaseOrderDocumentService } from '@app/core/services/purchase-order-document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  EditService, ToolbarService, PageService, PageSettingsModel,
  FilterSettingsModel, GridLine, GridComponent
} from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { NgbDateStruct, NgbModal, NgbCalendar, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { PurchaseOrdersEditionModalComponent } from '../purchase-orders-edition-modal/purchase-orders-edition-modal.component';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { saveAs } from 'file-saver';
import { PurchaseOrderDetailTaxService } from '@app/core/services/purchase-order-detail-tax.service';
import { CostTypeService } from '@app/core/services/cost-type.service';
import { ProjectService } from '@app/core/services/project.service';
import { PurchaseOrderType } from '@app/core/enums/purchaseOrderType';

@Component({
  selector: 'app-purchase-orders-form',
  templateUrl: './purchase-orders-form.component.html',
  styleUrls: ['./purchase-orders-form.component.scss'],
  providers: [ToolbarService, EditService, PageService, NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class PurchaseOrdersFormComponent implements OnInit {

  @Input() item: any;

  @ViewChild('formPurchaseOrder', { static: false })
  public formPurchaseOrder: NgForm;
  @ViewChild('purchaseOrderTypeObj', { static: false })
  public purchaseOrderTypeObj: DropDownListComponent;
  @ViewChild('supplierObj', { static: false })
  public supplierObj: DropDownListComponent;
  @ViewChild('supplierContactObj', { static: false })
  public supplierContactObj: DropDownListComponent;
  @ViewChild('businessUnitObj', { static: false })
  public businessUnitObj: DropDownListComponent;
  @ViewChild('costCenterObj', { static: false })
  public costCenterObj: DropDownListComponent;
  @ViewChild('paymentTypeObj', { static: false })
  public paymentTypeObj: DropDownListComponent;
  @ViewChild('paymentTermObj', { static: false })
  public paymentTermObj: DropDownListComponent;
  @ViewChild('gridPurchaseOrderEdition', { static: false })
  gridPurchaseOrderEdition: GridComponent;
  @ViewChild('dateformat')
  public dateRangeObj: DateRangePickerComponent;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;
  @ViewChild('carousel') carousel: any;
  @ViewChild('costTypeObj', { static: false })
  public costTypeObj: DropDownListComponent;
  @ViewChild('projectObj', { static: false })
  public projectObj: DropDownListComponent;

  /***** grid *****/
  public colsPurchaseOrderEdition: any;
  public itemsPagePurchaseOrderEdition: any;
  public pageSettingsPurchaseOrderEdition: PageSettingsModel;
  public filterOptionsPurchaseOrderEdition: FilterSettingsModel;
  public filterGridPurchaseOrderEdition: any;
  public gridLinesPurchaseOrderEdition: GridLine;
  public selectOptionsPurchaseOrderEdition: any;
  /***** fin grid *****/

  /***** date Range Picker *****/
  public format: string;
  public startDate: Date;
  public endDate: Date;
  /***** fin date Range Picker *****/

  /***** carousel *****/
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = true;
  /***** fin carousel *****/

  public titleHeader: string;
  public listHeaders: any;
  public listPurchaseOrderEdition: any;
  public listPurchaseOrderTypes: any;
  public listSuppliers: any;
  public listBusinessUnits: any;
  public listCostCenters: any;
  public listSupplierContacts: any;
  public listPaymentTypes: any;
  public listSupplierPaymentTerm: any;
  public listCostTypes: any;
  public listProjects: any;
  public purchaseOrder: any;
  public submitted: boolean;
  public pageRedirect: string;
  public actionForm: Action;
  public actionModal = Action;
  public currentUser: any;
  public estimatedDate: NgbDateStruct;
  public startPeriod: NgbDateStruct;
  public endPeriod: NgbDateStruct;
  public maxLengthNotes: number;
  public maxLengthObservations: number;
  public purchaseOrderDocument: any;
  public purchaseOrderImages: any;
  public fileUploadImage: any;
  public typesFiles: string[];
  public typesImages: string[];
  public files: any;
  public listDocumentSelected: any;
  public dataEvent: any;
  public imageNameSelected: string;
  public listCurrencies: any;
  public supplierRecord: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public total: any;
  public subTotal: any;
  public quantityTotal: number;
  public purchaseOrderType: any;

  constructor(
    private projectSettings: ProjectSettings,
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    private taxService: TaxService,
    private purchaseOrderDocumentService: PurchaseOrderDocumentService,
    private currencyService: CurrencyService,
    private purchaseOrderTypeService: PurchaseOrderTypeService,
    private supplierService: SupplierService,
    private businessUnitService: BusinessUnitService,
    private costCenterService: CostCenterService,
    private supplierContactService: SupplierContactService,
    private supplierPaymentTermService: SupplierPaymentTermService,
    private supplierRecordService: SupplierRecordService,
    private paymentTypeService: PaymentTypeService,
    private costTypeService: CostTypeService,
    private projectService: ProjectService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private config: NgbCarouselConfig
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.listPurchaseOrderEdition = [];
    this.listPurchaseOrderTypes = [];
    this.listSuppliers = [];
    this.listBusinessUnits = [];
    this.listCostCenters = [];
    this.listSupplierContacts = [];
    this.listPaymentTypes = [];
    this.listSupplierPaymentTerm = [];
    this.listCostTypes = [];
    this.listProjects = [];
    this.listTaxesDetail = [];
    this.purchaseOrder = {
      id: 0,
      folio: '',
      paymentTypeId: null,
      paymentTypeName: '',
      purchaseOrderTypeId: null,
      purchaseOrderTypeName: '',
      requisitionHeaderId: null,
      businessUnitId: null,
      businessUnitName: '',
      costCenterId: null,
      costCenterName: '',
      endPeriod: '',
      estimatedDate: '',
      startPeriod: '',
      supplierContactId: null,
      supplierId: null,
      notes: ' ',
      observations: ' '
    };

    this.purchaseOrderDocument = [/*{
      id: 0,
      path: '',
      purchaseOrderHeaderId: 0,
      systemName: '',
      userName: ''
    }*/];

    this.purchaseOrderImages = [/*{
      id: 0,
      path: '',
      purchaseOrderHeaderId: 0,
      systemName: '',
      userName: ''
    }*/];

    this.supplierRecord = {
      id: 0,
      plantId: null,
      supplierPaymentTermId: null,
      notes: '',
      fiscalSituationId: 0,
      fiscalSituation: '',
      accountStatusId: 0,
      accountStatus: '',
      supplierRecordDocuments: []
    };

    this.maxLengthNotes = 200;
    this.maxLengthObservations = 200;
    this.estimatedDate = this.calendar.getToday();
    this.actionForm = Action.None;
    this.submitted = false;
    this.pageRedirect = '/purchases/purchase-orders';
    this.listDocumentSelected = [];
    this.fileUploadImage = [];
    this.typesFiles = ['.png', '.jpg', '.jpeg', '.pdf', '.xlsx'/*, '.docx', '.doc'*/];
    this.typesImages = ['.png', '.jpg', '.jpeg'];
    this.files = [];
    this.dataEvent = { current: 'slideId_0' };
    this.listCurrencies = [];
    this.total = 0;
    this.subTotal = 0;
    this.purchaseOrderType = PurchaseOrderType;

    /***** grid *****/
    this.itemsPagePurchaseOrderEdition = this.projectSettings.itemsPage();
    this.pageSettingsPurchaseOrderEdition = { pageSizes: this.itemsPagePurchaseOrderEdition, pageSize: 10 };
    this.filterOptionsPurchaseOrderEdition = { type: 'Excel', ignoreAccent: true };
    this.filterGridPurchaseOrderEdition = { type: 'Excel' };
    this.gridLinesPurchaseOrderEdition = 'Both';
    this.selectOptionsPurchaseOrderEdition = { type: 'Single' };
    this.colsPurchaseOrderEdition = [];
    /***** fin grig *****/

    /***** date Range Picker *****/
    this.format = 'yyyy\'\-\'MM\'\-\'dd';
    this.startDate = moment().toDate();
    // new Date(new Date().toDateString());
    this.endDate = moment().add(7, 'days').toDate();
    // new Date(new Date().setDate(20));
    /***** fin date Range Picker *****/
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.colsPurchaseOrderEdition = [
      { field: 'code', headerText: 'NO. PARTE', width: 80 },
      { field: 'name', headerText: 'DESCRIPCIÓN', width: 250 },
      { field: 'quantity', headerText: 'CANTIDAD', width: 80 },
      { field: 'unitMeasureName', headerText: 'U/M', width: 80 },
      { field: 'dimension', headerText: 'DIMENSIÓN', width: 100, visible: false },
      { field: 'unitPrice', headerText: 'PRECIO UNITARIO', width: 120, align: 'right', format: '$0,0.0000' },
      { field: 'subTotal', headerText: 'PRECIO TOTAL', width: 120, align: 'right', format: '$0,0.0000' },
      { field: 'total', headerText: 'PRECIO TOTAL', width: 120, format: '$0,0.0000', visible: false }
    ];
    this.showForm();
  }

  listPurchaseOrders() {
    this.router.navigate([this.pageRedirect]);
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addPurchaseOrder':
            this.titleHeader = 'Agregar Orden de Compra';
            this.purchaseOrder = {
              id: 0,
              name: '',
              description: '',
              notes: '',
              observations: ''
            };
            this.getTaxes();
            this.actionForm = Action.Create;
            break;
          case 'editPurchaseOrder':
            this.titleHeader = 'Editar Orden de Compra';
            this.actionForm = Action.Edit;
            this.getPurchaseOrderById(params.id);
            this.getPurchaseOrderDetailTaxByHeader(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getPurchaseOrderTypes();
    this.getSuppliers();
    this.getBusinessUnits();
    this.getPaymentTypes();
    this.getCurrencies();
    this.getCostTypes();
    this.getProjects();
  }

  getPurchaseOrderTypes() {
    this.spinner.show();
    this.purchaseOrderTypeService.getPurchaseOrderTypes().subscribe(
      data => {
        this.listPurchaseOrderTypes = data;
        this.purchaseOrderTypeObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.purchaseOrderTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringPurchaseOrderTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listPurchaseOrderTypes, query);
  }

  getSuppliers() {
    this.spinner.show();
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.listSuppliers = data;
        this.supplierObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.supplierId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringSuppliers: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listSuppliers, query);
  }

  changeSupplier() {
    this.listSupplierContacts = [];
    const supplierValue = this.supplierObj.value;
    if (supplierValue !== null) {
      this.getSupplierContactsBySupplierId(supplierValue);
      if (this.actionForm === Action.Create) {
        this.getSupplierRecordBySupplierId(supplierValue);
      }
    }
  }

  getSupplierContactsBySupplierId(supplierValue) {
    this.spinner.show();
    this.supplierContactService.getSupplierContactsBySupplierId(supplierValue).subscribe(
      data => {
        this.listSupplierContacts = data;
        this.supplierContactObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.supplierContactId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringSupplierContacts: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listSupplierContacts, query);
  }

  getSupplierRecordBySupplierId(supplierValue) {
    this.spinner.show();
    this.supplierRecordService.getSupplierRecordBySupplierId(supplierValue).subscribe(
      data => {
        this.supplierRecord = data;
        this.supplierRecord.notes = this.supplierRecord.notes !== null ? this.purchaseOrder.paymentTermId : null;
        this.spinner.hide();
        this.getSupplierPaymentTerms();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getBusinessUnits() {
    this.spinner.show();
    this.businessUnitService.getBusinessUnits().subscribe(
      data => {
        this.listBusinessUnits = data;
        this.businessUnitObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.businessUnitId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringBusinessUnits: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listBusinessUnits, query);
  }

  changeBusinessUnit() {
    this.listCostCenters = [];
    const businessUnitValue = this.businessUnitObj.value;
    if (businessUnitValue !== null) {
      this.getCostCenters(businessUnitValue);
    }
  }

  getCostCenters(businessUnitId) {
    this.spinner.show();
    this.costCenterService.getCostCenters(businessUnitId).subscribe(
      data => {
        this.listCostCenters = data;
        this.costCenterObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.costCenterId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCostCenters: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCostCenters, query);
  }

  getCostTypes() {
    this.spinner.show();
    this.costTypeService.getCostTypes().subscribe(
      data => {
        this.listCostTypes = data;
        this.costTypeObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.costTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCostTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCostTypes, query);
  }

  getProjects() {
    this.spinner.show();
    this.projectService.getProjects().subscribe(
      data => {
        this.listProjects = data;
        if (this.actionForm === Action.Edit && this.purchaseOrder.projectId != null) {
          this.projectObj.value = (this.actionForm === Action.Edit && this.purchaseOrder.projectId != null) ? this.purchaseOrder.projectId : null;
        }
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringProjects: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listProjects, query);
  }

  getPurchaseOrderDocuments() {
    this.spinner.show();
    this.purchaseOrderDocumentService.getPurchaseOrderDocumentsByHeaderId(this.purchaseOrder.id).subscribe(
      data => {
        this.purchaseOrderDocument = data;
        let imageExtension = '';
        this.purchaseOrderImages = [];
        this.purchaseOrderDocument.forEach(element => {
          imageExtension = (element.userName.substr(element.userName.lastIndexOf('.'))).toLowerCase();
          if (this.typesImages.indexOf(imageExtension) !== -1) {
            this.purchaseOrderImages.push(element);
          }
        });
        this.imageNameSelected = this.purchaseOrderDocument.length !== 0 ? this.purchaseOrderDocument[0].userName : '';
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPaymentTypes() {
    this.spinner.show();
    this.paymentTypeService.getPaymentTypes().subscribe(
      data => {
        this.listPaymentTypes = data;
        this.paymentTypeObj.value =
          this.actionForm === Action.Edit ? this.purchaseOrder.paymentTypeId : this.purchaseOrder.paymentTypeId = 2;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringPaymentTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listPaymentTypes, query);
  }

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.currencyObj.value = this.actionForm === Action.Edit ? this.purchaseOrder.currencyId : this.purchaseOrder.currencyId = 101;
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

  getSupplierPaymentTerms() {
    this.spinner.show();
    this.supplierPaymentTermService.getSupplierPaymentTerms().subscribe(
      data => {
        this.listSupplierPaymentTerm = data;
        this.paymentTermObj.value =
          this.actionForm === Action.Edit ? this.purchaseOrder.paymentTermId : this.supplierRecord.supplierPaymentTermId;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringSupplierPaymentTerms: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listSupplierPaymentTerm, query);
  }

  editItemPurchaseOrder(item) {
    this.openModalPurchaseOrderEdition(Action.Edit, item);
  }

  confirmDeleteItemPurchaseOrder(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar el artículo <strong>${item.fullName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //delete item and taxes
        this.listPurchaseOrderEdition = this.listPurchaseOrderEdition.filter(o => o.articleId !== item.articleId);
        this.listTaxesDetail = this.listTaxesDetail.filter(o => o.articleId !== item.articleId);
        this.calculationTaxes();
        this.gridPurchaseOrderEdition.refresh();
      }
    });
  }

  getPurchaseOrderById(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderHeaderService.getPurchaseOrderById(purchaseOrderId).subscribe(
      data => {
        this.purchaseOrder = data;
        if (this.purchaseOrder.supplierContactId === 0) {
          this.purchaseOrder.supplierContactId = null;
        }
        this.getPurchaseOrderDocuments();
        this.getSupplierPaymentTerms();
        if (this.purchaseOrder.notes == null) {
          this.purchaseOrder.notes = '';
        }
        if (this.purchaseOrder.observations == null) {
          this.purchaseOrder.observations = '';
        }
        if (this.purchaseOrder.estimatedDate != null) {
          const [day, month, year] = this.purchaseOrder.estimatedDate.split('-');
          const objDate = {
            day: parseInt(day, 0),
            month: parseInt(month, 0),
            year: parseInt(year, 0)
          };
          this.estimatedDate = objDate;
        }

        if (this.purchaseOrder.startPeriod != null) {
          this.startDate = (moment(this.purchaseOrder.startPeriod, 'DD-MM-YYYY').toDate());
          this.endDate = (moment(this.purchaseOrder.endPeriod, 'DD-MM-YYYY').toDate());
        }

        this.spinner.hide();
        this.getPurchaseOrderDetailByHeaderId(purchaseOrderId);
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPurchaseOrderDetailByHeaderId(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(purchaseOrderId).subscribe(
      data => {
        this.listPurchaseOrderEdition = data;
        if (this.purchaseOrder.notes == null) {
          this.purchaseOrder.notes = '';
        }
        if (this.purchaseOrder.observations == null) {
          this.purchaseOrder.observations = '';
        }
        this.calculationTotal();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPurchaseOrderDetailTaxByHeader(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderDetailTaxService.GetPurchaseOrderDetailTaxByPOH(purchaseOrderId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getTaxes() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        for (const item of this.listTaxes) {
          item.amount = 0;
        }
        if (this.actionForm === Action.Edit) {
          this.calculationTaxes();
        }
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  calculationTaxes() {
    for (const itemT of this.listTaxes) {
      itemT.amount = 0;
    }
    for (const itemD of this.listTaxesDetail) {
      for (const itemT of this.listTaxes) {
        if (itemD.taxId === itemT.id) {
          itemT.amount = numeral(numeral(itemT.amount).value() + numeral(itemD.amount).value()).format('$0,0.0000');
        }
      }
    }
    this.listTaxesAdded = [];
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
    this.calculationTotal();
    // return numeral(numeral(amountTax).value() + numeral(amountDetail).value()).format('$0,0.0000');
  }

  calculationTotal() {
    this.quantityTotal = 0;
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listPurchaseOrderEdition) {
      this.quantityTotal = this.quantityTotal + item.quantity;
      this.subTotal = numeral(numeral(this.subTotal).value() + item.subTotal).format('$0,0.0000');
      this.total = numeral(numeral(this.total).value() + item.total).format('$0,0.0000');
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formPurchaseOrder.invalid) {
      return;
    }

    if (this.listPurchaseOrderEdition.length === 0) {
      this.alertMessageService.warningMessage('Debe agregar al menos 1 artículo a la orden de compra.');
      return;
    }

    const purchaseOrderSave: any = {};

    const detailArray = [];
    this.listPurchaseOrderEdition.forEach(element => {
      detailArray.push({
        id: element.id,
        unitMeasureId: element.unitMeasureId,
        articleId: element.articleId,
        code: element.code,
        name: element.name,
        description: element.description,
        unitPrice: element.unitPrice,
        dimension: element.dimension,
        quantity: element.quantity,
        subTotal: element.subTotal,
        total: element.total
      });
    });

    purchaseOrderSave.id = this.purchaseOrder.id;
    purchaseOrderSave.purchaseOrderTypeId = this.purchaseOrder.purchaseOrderTypeId;
    purchaseOrderSave.businessUnitId = this.purchaseOrder.businessUnitId;
    purchaseOrderSave.costCenterId = this.purchaseOrder.costCenterId;
    purchaseOrderSave.paymentTypeId = this.purchaseOrder.paymentTypeId;
    purchaseOrderSave.paymentTermId = this.purchaseOrder.paymentTermId;
    purchaseOrderSave.supplierId = this.purchaseOrder.supplierId;
    purchaseOrderSave.supplierContactId = this.purchaseOrder.supplierContactId;
    purchaseOrderSave.currencyId = this.currencyObj.value;
    purchaseOrderSave.costTypeId = this.costTypeObj.value;
    purchaseOrderSave.projectId = this.purchaseOrder.projectId;
    purchaseOrderSave.estimatedDate =
      moment(`${this.estimatedDate.year}-${this.estimatedDate.month}-${this.estimatedDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    purchaseOrderSave.startPeriod = moment(this.dateRangeObj.startDate).format('YYYY-MM-DD');
    purchaseOrderSave.endPeriod = moment(this.dateRangeObj.endDate).format('YYYY-MM-DD');
    purchaseOrderSave.previousAmount = this.purchaseOrder.previousAmount;
    purchaseOrderSave.notes = this.purchaseOrder.notes;
    purchaseOrderSave.observations = this.purchaseOrder.observations;
    purchaseOrderSave.detail = this.purchaseOrder.detail;
    purchaseOrderSave.purchaseOrderDetail = detailArray;
    purchaseOrderSave.createBy = this.currentUser.userName;
    purchaseOrderSave.document = [];

    this.files.forEach(item => {
      purchaseOrderSave.document.push({
        id: item.id,
        userName: item.name,
        systemName: '',
        path: ''
      });
    });

    const formData = new FormData();

    this.files.forEach(item => {
      formData.append('files', item, item.name);
    });

    formData.append('PurchaseOrderHeaderSave', JSON.stringify(purchaseOrderSave));

    this.spinner.show();
    switch (this.actionForm) {
      case Action.Create:
        this.purchaseOrderHeaderService.savePurchaseOrder(formData).subscribe(data => {
          this.alertMessageService.successMessage('Orden de Compra guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.purchaseOrderHeaderService.updatePurchaseOrder(formData).subscribe(data => {
          this.alertMessageService.successMessage('Orden de Compra editado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  openModalPurchaseOrderEdition(action: Action, item: any) {
    const modalRef = this.modalService.open(PurchaseOrdersEditionModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nuevo Artículo';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Artículo';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.listItemAdded = this.listPurchaseOrderEdition;
    modalRef.result.then((e) => {
      if (e !== null) {
        // new article
        if (!this.listPurchaseOrderEdition.some(o => o.articleId === e.articleId)) {
          this.listPurchaseOrderEdition.push(e);
          for (const tax of e.taxes) {
            const arrayTax: any = {
              id: 0,
              articleId: e.articleId,
              taxId: tax.id,
              valuePercentage: tax.valuePercentage,
              amount: tax.amount
            };
            this.listTaxesDetail.push(arrayTax);
          }
        } else {
          // edit article
          this.listPurchaseOrderEdition = this.listPurchaseOrderEdition.filter(o => o.articleId !== e.articleId);
          this.listPurchaseOrderEdition.push(e);
          for (const itemD of this.listTaxesDetail) {
            if (itemD.articleId === e.articleId) {
              for (const tax of e.taxes) {
                itemD.amount = tax.amount;
              }
            }
          }
        }
        if (this.listPurchaseOrderEdition.length > 1) {
          this.gridPurchaseOrderEdition.refresh();
        }
        this.calculationTaxes();
      }
    });
  }

  documentSelect(id, event) {

    if (event.target.files.length > 5) {
      this.alertMessageService.errorMessage('message');
      return;
    }
    let fileExtension = '';

    for (const file of event.target.files) {
      fileExtension = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        this.fileUploadImage.nativeElement.value = '';
        return;
      }
    }

    this.files = [];
    this.listDocumentSelected = [];
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);
      this.listDocumentSelected[index] = event.target.files[index].name;
    }
  }

  deleteDocumentSelected(indexSelected) {
    this.files.splice(indexSelected, 1);
    this.listDocumentSelected = [];
    for (let index = 0; index < this.files.length; index++) {
      this.listDocumentSelected[index] = this.files[index].name;
    }
  }

  downloadDocument(document) {
    this.spinner.show();
    this.purchaseOrderDocumentService.downloadPurchaseOrderDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  confirmDeleteDocument(index) {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar el documento <strong>${this.purchaseOrderDocument[index].userName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteDocument(this.purchaseOrderDocument[index]);
      }
    });
  }

  confirmDeleteImage() {
    this.carousel.pause();
    const imageIndex = this.dataEvent.current;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar la imagen en pantalla <strong>${this.purchaseOrderImages[imageIndex].userName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteDocument(this.purchaseOrderImages[imageIndex]);
      }
      this.carousel.cycle();
    });
  }

  deleteDocument(document) {
    this.spinner.show();
    this.purchaseOrderDocumentService.deletePurchaseOrderDocument(
      document.requisitionHeaderId,
      document.id,
      document.systemName,
      document.path,
      this.currentUser.userName).subscribe(data => {
        this.alertMessageService.successMessage('Documento borrado correctamente.');
        this.getPurchaseOrderDocuments();
        this.spinner.hide();
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(event) {
    this.dataEvent = event;
    this.imageNameSelected = this.purchaseOrderImages[this.dataEvent.current].userName;
  }
}
