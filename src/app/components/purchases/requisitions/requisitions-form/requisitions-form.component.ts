import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertMessageService, RequisitionHeaderService, SessionService, SupplierService, BusinessUnitService,
  PlantService, RequisitionTypeService, CostCenterService, SupplierRecordService, RequisitionDetailService, CurrencyService, TaxService
} from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { RequisitionsEditionModalComponent } from '../requisitions-edition-modal/requisitions-edition-modal.component';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, PageSettingsModel, FilterSettingsModel, GridLine } from '@syncfusion/ej2-angular-grids';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RequisitionDocumentService } from '@app/core/services/requisition-document.service';
import { RequisitionDetailTaxService } from '@app/core/services/requisition-detail-tax.service';
import { saveAs } from 'file-saver';
import * as numeral from 'numeral';


@Component({
  selector: 'app-requisitions-form',
  templateUrl: './requisitions-form.component.html',
  styleUrls: ['./requisitions-form.component.scss'],
  providers: [NgbCarouselConfig]
})
export class RequisitionsFormComponent implements OnInit {

  @ViewChild('formRequisition', { static: false })
  public formRequisition: NgForm;
  @ViewChild('requisitionTypeObj', { static: false })
  public requisitionTypeObj: DropDownListComponent;
  @ViewChild('supplierObj', { static: false })
  public supplierObj: DropDownListComponent;
  @ViewChild('plantObj', { static: false })
  public plantObj: DropDownListComponent;
  @ViewChild('businessUnitObj', { static: false })
  public businessUnitObj: DropDownListComponent;
  @ViewChild('costCenterObj', { static: false })
  public costCenterObj: DropDownListComponent;
  @ViewChild('gridRequisitionEdition', { static: false })
  gridRequisitionEdition: GridComponent;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;
  @ViewChild('carousel') carousel: any; //{ static: true }) // private carousel: NgbCarousel;

  /***** grid *****/
  public colsRequisitionEdition: any;
  public itemsPageRequisitionEdition: any;
  public pageSettingsRequisitionEdition: PageSettingsModel;
  public filterOptionsRequisitionEdition: FilterSettingsModel;
  public filterGridRequisitionEdition: any;
  public gridLinesRequisitionEdition: GridLine;
  public selectOptionsRequisitionEdition: any;
  /***** fin grid *****/

  /***** carousel *****/
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = true;
  /***** fin carousel *****/

  public titleHeader: string;
  public listHeaders: any;
  public listRequisitionEdition: any;
  public listRequisitionTypes: any;
  public listSuppliers: any;
  public listBusinessUnits: any;
  public listCostCenters: any;
  public listPlants: any;
  public requisition: any;
  public submitted: boolean;
  public pageRedirect: string;
  public actionForm: Action;
  public actionModal = Action;
  public currentUser: any;
  public modelDate: NgbDateStruct;
  public observation: string;
  public requisitionDocument: any;
  public requisitionImages: any;
  public fileUploadImage: any;
  public typesFiles: string[];
  public typesImages: string[];
  public files: any;
  public listDocumentSelected: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public dataEvent: any;
  public imageNameSelected: string;
  public listCurrencies: any;
  public total: any;
  public subTotal: any;

  constructor(
    private projectSettings: ProjectSettings,
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private requisitionHeaderService: RequisitionHeaderService,
    private requisitionTypeService: RequisitionTypeService,
    private requisitionDocumentService: RequisitionDocumentService,
    private currencyService: CurrencyService,
    private supplierService: SupplierService,
    private businessUnitService: BusinessUnitService,
    private costCenterService: CostCenterService,
    private plantService: PlantService,
    private supplierRecordService: SupplierRecordService,
    private requisitionDetailService: RequisitionDetailService,
    private requisitionDetailTaxService: RequisitionDetailTaxService,
    private taxService: TaxService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private config: NgbCarouselConfig
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.listRequisitionEdition = [];
    this.listRequisitionTypes = [];
    this.listSuppliers = [];
    this.listBusinessUnits = [];
    this.listCostCenters = [];
    this.listPlants = [];

    this.requisition = {
      id: 0,
      requisitionTypeId: null,
      supplierId: null,
      businessUnitId: null,
      costCenterId: null,
      currencyId: null,
      dateOrder: null
    };

    this.requisitionDocument = [/*{
      id: 0,
      path: '',
      requisitionHeaderId: 0,
      systemName: '',
      userName: ''
    }*/];

    this.requisitionImages = [/*{
      id: 0,
      path: '',
      requisitionHeaderId: 0,
      systemName: '',
      userName: ''
    }*/];
    this.listTaxesDetail = [];
    this.listTaxesAdded = [];
    this.listTaxes = [];
    this.modelDate = this.calendar.getToday();
    this.actionForm = Action.None;
    this.submitted = false;
    this.listDocumentSelected = [];
    this.fileUploadImage = [];
    this.pageRedirect = '/purchases/requisitions';
    this.typesFiles = ['.png', '.jpg', '.jpeg', '.pdf', '.xlsx'/*, '.docx', '.doc'*/];
    this.typesImages = ['.png', '.jpg', '.jpeg'];
    this.files = [];
    this.dataEvent = { current: 'slideId_0' };
    this.listCurrencies = [];
    this.total = 0;
    this.subTotal = 0;

    /***** grid *****/
    this.itemsPageRequisitionEdition = this.projectSettings.itemsPage();
    this.pageSettingsRequisitionEdition = { pageSizes: this.itemsPageRequisitionEdition, pageSize: 10 };
    this.filterOptionsRequisitionEdition = { type: 'Excel', ignoreAccent: true };
    this.filterGridRequisitionEdition = { type: 'Excel' };
    this.gridLinesRequisitionEdition = 'Both';
    this.selectOptionsRequisitionEdition = { type: 'Single' };
    this.colsRequisitionEdition = [];
    /***** fin grig *****/
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.colsRequisitionEdition = [
      { field: 'code', headerText: 'NO. PARTE', width: 80 },
      { field: 'name', headerText: 'DESCRIPCIÓN', width: 250 },
      { field: 'quantity', headerText: 'CANTIDAD', width: 80 },
      { field: 'unitMeasureName', headerText: 'U/M', width: 80 },
      { field: 'dimension', headerText: 'DIMENSIÓN', width: 100, visible: false },
      { field: 'unitPrice', headerText: 'PRECIO UNITARIO', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'subTotal', headerText: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'total', headerText: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000', visible: false }
    ];
    this.showForm();
  }

  listRequisitions() {
    this.router.navigate([this.pageRedirect]);
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addRequisition':
            this.titleHeader = 'Agregar Requisición';
            this.requisition = {
              id: 0,
              requisitionTypeId: null,
              supplierId: null,
              businessUnitId: null,
              costCenterId: null,
              dateOrder: null
            };
            this.getTaxes();
            this.actionForm = Action.Create;
            break;
          case 'editRequisition':
            this.titleHeader = 'Editar Requisición';
            this.actionForm = Action.Edit;
            this.getRequisitionById(params.id);
            // llamar observacion
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getRequisitionTypes();
    this.getSuppliers();
    this.getBusinessUnits();
    this.getCurrencies();
  }

  getRequisitionById(requisitionId) {
    this.spinner.show();
    this.requisitionHeaderService.getRequisitionById(requisitionId).subscribe(
      data => {
        this.requisition = data;
        const [day, month, year] = data.dateOrder.split('-');
        const objDate = {
          day: parseInt(day, 0),
          month: parseInt(month, 0),
          year: parseInt(year, 0)
        };
        this.modelDate = objDate;
        this.getRequisitionDetailByHeaderId(data.id);
        this.getRequisitionDocuments();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getRequisitionDetailByHeaderId(requisitionHeaderId) {
    this.spinner.show();
    this.requisitionDetailService.getRequisitionDetailByHeaderId(requisitionHeaderId).subscribe(
      data => {
        this.listRequisitionEdition = data;
        this.getRequisitionDetailTaxByHeader(requisitionHeaderId);
        this.calculationTotal();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getRequisitionTypes() {
    this.spinner.show();
    this.requisitionTypeService.getRequisitionTypes().subscribe(
      data => {
        this.listRequisitionTypes = data;
        this.requisitionTypeObj.value = this.actionForm === Action.Edit ? this.requisition.requisitionTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringRequisitionTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listRequisitionTypes, query);
  }

  getSuppliers() {
    this.spinner.show();
    this.supplierService.getSuppliers().subscribe(
      data => {
        this.listSuppliers = data;
        this.supplierObj.value = this.actionForm === Action.Edit ? this.requisition.supplierId : null;
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
    const supplierValue = this.supplierObj.value;
    if (supplierValue !== null) {
      this.getSupplierRecordBySupplierId(supplierValue);
    }
  }

  getSupplierRecordBySupplierId(supplierId) {
    this.spinner.show();
    this.supplierRecordService.getSupplierRecordBySupplierId(supplierId).subscribe(
      data => {
        this.getPlants(data.plantId);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getPlants(plantId) {
    this.spinner.show();
    this.plantService.getPlants().subscribe(
      data => {
        this.listPlants = data.filter(o => o.id === plantId);
        this.plantObj.value = this.listPlants[0].id;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringPlants: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listPlants, query);
  }

  getBusinessUnits() {
    this.spinner.show();
    this.businessUnitService.getBusinessUnits().subscribe(
      data => {
        this.listBusinessUnits = data;
        this.businessUnitObj.value = this.actionForm === Action.Edit ? this.requisition.businessUnitId : null;
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
        this.costCenterObj.value = this.actionForm === Action.Edit ? this.requisition.costCenterId : null;
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

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.currencyObj.value = this.actionForm === Action.Edit ? this.requisition.currencyId : this.requisition.currencyId = 101;
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

  getRequisitionDocuments() {
    this.spinner.show();
    this.requisitionDocumentService.getRequisitionDocumentsByHeaderId(this.requisition.id).subscribe(
      data => {
        this.requisitionDocument = data;
        let imageExtension = '';
        this.requisitionImages = [];
        this.requisitionDocument.forEach(element => {
          imageExtension = (element.userName.substr(element.userName.lastIndexOf('.'))).toLowerCase();
          if (this.typesImages.indexOf(imageExtension) !== -1) {
            this.requisitionImages.push(element);
          }
        });
        this.imageNameSelected = this.requisitionDocument.length !== 0 ? this.requisitionDocument[0].userName : '';
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  editItemRequisition(item) {
    this.openModalRequisitionEdition(Action.Edit, item);
  }

  confirmDeleteItemRequisition(item) {
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
        this.listRequisitionEdition = this.listRequisitionEdition.filter(o => o.articleId !== item.articleId);
        this.gridRequisitionEdition.refresh();
      }
    });
  }

  openModalRequisitionEdition(action: Action, item: any) {
    const modalRef = this.modalService.open(RequisitionsEditionModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Agregar Artículo';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Artículo';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.listItemAdded = this.listRequisitionEdition;
    modalRef.result.then((e) => {
      if (e !== null) {
        // new article
        if (!this.listRequisitionEdition.some(o => o.articleId === e.articleId)) {
          this.listRequisitionEdition.push(e);
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
          this.listRequisitionEdition = this.listRequisitionEdition.filter(o => o.articleId !== e.articleId);
          this.listRequisitionEdition.push(e);
          for (const itemD of this.listTaxesDetail) {
            if (itemD.articleId === e.articleId) {
              for (const tax of e.taxes) {
                itemD.amount = tax.amount;
              }
            }
          }
        }

        if (this.listRequisitionEdition.length > 1) {
          this.gridRequisitionEdition.refresh();
        }
        this.calculationTaxes();
      }
    });
  }

  saveForm() {
    this.submitted = true;

    if (this.formRequisition.invalid) {
      return;
    }

    if (this.listRequisitionEdition.length === 0) {
      this.alertMessageService.warningMessage('Debe agregar al menos 1 artículo a la requisición.');
      return;
    }

    const requisitionSave: any = {};

    const detailArray = [];
    this.listRequisitionEdition.forEach(element => {
      detailArray.push({
        id: element.id,
        requisitionHeaderId: element.requisitionHeaderId,
        articleId: element.articleId,
        code: element.code,
        name: element.name,
        description: element.description,
        unitPrice: element.unitPrice,
        dimension: element.dimension,
        quantity: element.quantity,
        subTotal: element.subTotal,
        total: element.total,
        estimatedDate: moment(element.estimatedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
      });
    });

    requisitionSave.id = this.requisition.id;
    requisitionSave.requisitionTypeId = this.requisitionTypeObj.value;
    requisitionSave.supplierId = this.supplierObj.value;
    requisitionSave.businessUnitId = this.businessUnitObj.value;
    requisitionSave.costCenterId = this.costCenterObj.value;
    requisitionSave.currencyId = this.currencyObj.value;
    requisitionSave.dateOrder =
      moment(`${this.modelDate.day}-${this.modelDate.month}-${this.modelDate.year}`, 'DD-MM-YYYY').format('YYYY-MM-DD');
    requisitionSave.detail = detailArray;
    requisitionSave.createBy = this.currentUser.userName;
    requisitionSave.Document = [];

    this.files.forEach(item => {
      requisitionSave.Document.push({
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

    formData.append('requisitionHeaderSave', JSON.stringify(requisitionSave));

    this.spinner.show();
    switch (this.actionForm) {
      case Action.Create:
        this.requisitionHeaderService.saveRequisition(formData).subscribe(data => {
          this.alertMessageService.successMessage('Requisición guardada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.requisitionHeaderService.updateRequisition(formData).subscribe(data => {
          this.alertMessageService.successMessage('Requisición editada correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  documentSelect(id, event) {

    if (event.target.files.length > 5) {
      this.alertMessageService.errorMessage('message');
      return;
    }
    let fileExtension = '';
    for (let i = 0; i < event.target.files.length; i++) {
      fileExtension = (event.target.files[i].name.substr(event.target.files[i].name.lastIndexOf('.'))).toLowerCase();
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
    this.requisitionDocumentService.downloadRequisitionDocument(document).subscribe(
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
      html: `¿Desea eliminar el documento <strong>${this.requisitionDocument[index].userName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteDocument(this.requisitionDocument[index]);
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
      html: `¿Desea eliminar la imagen en pantalla <strong>${this.requisitionImages[imageIndex].userName}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteDocument(this.requisitionImages[imageIndex]);
      }
      this.carousel.cycle();
    });
  }

  deleteDocument(document) {
    this.spinner.show();
    this.requisitionDocumentService.deleteRequisitionDocument(
      document.requisitionHeaderId,
      document.id,
      document.systemName,
      document.path,
      this.currentUser.userName).subscribe(data => {
        this.alertMessageService.successMessage('Documento borrado correctamente.');
        this.getRequisitionDocuments();
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
    this.imageNameSelected = this.requisitionImages[this.dataEvent.current].userName;
  }

  getRequisitionDetailTaxByHeader(requisitionHeaderId) {
    this.spinner.show();
    this.requisitionDetailTaxService.GetRequisitionDetailTaxByRH(requisitionHeaderId).subscribe(
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
        this.calculationTaxes();
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
  }

  calculationTotal() {
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listRequisitionEdition) {
      this.subTotal = numeral(numeral(this.subTotal).value() + item.subTotal).format('$0,0.0000');
      this.total = numeral(numeral(this.total).value() + item.total).format('$0,0.0000');
    }
  }

}