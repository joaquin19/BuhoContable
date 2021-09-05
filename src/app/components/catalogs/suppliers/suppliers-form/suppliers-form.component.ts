import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  SessionService, AlertMessageService, SupplierTypeService, CountryService, StateProvinceService, CityService,
  PlantService, SupplierPaymentTermService, SupplierService, SupplierDocumentTypeService, SupplierLegalRepresentativeService,
  SupplierFinancialService, SupplierRecordService, SupplierRecordDocumentService, SupplierContactService

} from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { SuppliersFinancialModalComponent } from '../suppliers-financial-modal/suppliers-financial-modal.component';
import { SuppliersContactModalComponent } from '../suppliers-contact-modal/suppliers-contact-modal.component';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action } from '@app/core/enums';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { PageSettingsModel, GridLine, FilterSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styleUrls: ['./suppliers-form.component.scss']
})
export class SuppliersFormComponent implements OnInit {

  @ViewChild('formSupplier', { static: false })
  public formSupplier: NgForm;
  @ViewChild('accSupplier', { static: false })
  public accSupplier: NgbAccordion;
  @ViewChild('supplierTypeObj', { static: false })
  public supplierTypeObj: DropDownListComponent;
  @ViewChild('countryObj', { static: false })
  public countryObj: DropDownListComponent;
  @ViewChild('stateProvinceObj', { static: false })
  public stateProvinceObj: DropDownListComponent;
  @ViewChild('cityObj', { static: false })
  public cityObj: DropDownListComponent;
  @ViewChild('plantObj', { static: false })
  public plantObj: DropDownListComponent;
  @ViewChild('supplierPaymentTermObj', { static: false })
  public supplierPaymentTermObj: DropDownListComponent;
  @ViewChild('stateProvinceObj', { static: false })
  public fileUploadFiscalSituation: ElementRef;
  @ViewChild('fileUploadAccountStatus', { static: false })
  public fileUploadAccountStatus: ElementRef;
  @ViewChild('gridSupplierFinancials', { static: false })
  gridSupplierFinancials: GridComponent;
  @ViewChild('gridSupplierContacts', { static: false })
  gridSupplierContacts: GridComponent;

  public supplier: any;
  public supplierLegalRepresentative: any;
  public listSupplierFinancials: any;
  public supplierRecord: any;
  public fiscalSituationDocument: any;
  public accountStatusDocument: any;
  public listSupplierContacts: any;
  public listSupplierType: any;
  public listCountries: any;
  public listStatesProvinces: any;
  public listCities: any;
  public listPlants: any;
  public listSupplierPaymentTerm: any;
  public listSupplierDocumentType: any;
  public submitted: boolean;
  public titleHeader: string;
  public maxLengthNotes: number;
  public typesFiles: string[];
  public files: any;
  public actionForm: Action;
  public actionContact: any;
  public actionModal = Action;
  public pageRedirect: string;
  public currentUser: any;

  public colsSupplierFinancial: any;
  public itemsPageSupplierFinancial: any;
  public pageSettingsSupplierFinancial: PageSettingsModel;
  public filterOptionsSupplierFinancial: FilterSettingsModel;
  public filterGridSupplierFinancial: any;
  public gridLinesSupplierFinancial: GridLine;
  public selectOptionsSupplierFinancial: any;

  public colsSupplierContact: any;
  public itemsPageSupplierContact: any;
  public pageSettingsSupplierContact: PageSettingsModel;
  public filterOptionsSupplierContact: FilterSettingsModel;
  public filterGridSupplierContact: any;
  public gridLinesSupplierContact: GridLine;
  public selectOptionsSupplierContact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private supplierTypeService: SupplierTypeService,
    private countryService: CountryService,
    private stateProvinceService: StateProvinceService,
    private cityService: CityService,
    private plantService: PlantService,
    private supplierPaymentTermService: SupplierPaymentTermService,
    private supplierService: SupplierService,
    private supplierDocumentTypeService: SupplierDocumentTypeService,
    private supplierLegalRepresentativeService: SupplierLegalRepresentativeService,
    private supplierFinancialService: SupplierFinancialService,
    private supplierRecordService: SupplierRecordService,
    private supplierRecordDocumentService: SupplierRecordDocumentService,
    private supplierContactService: SupplierContactService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {

    this.initObjects();

    this.listSupplierType = [];
    this.listCountries = [];
    this.listStatesProvinces = [];
    this.listCities = [];
    this.listPlants = [];
    this.listSupplierPaymentTerm = [];
    this.listSupplierDocumentType = [];
    this.titleHeader = '';
    this.maxLengthNotes = 200;
    this.titleHeader = '';
    this.typesFiles = ['.pdf'];
    this.files = [];

    this.itemsPageSupplierFinancial = this.projectSettings.itemsPage();
    this.pageSettingsSupplierFinancial = { pageSizes: this.itemsPageSupplierFinancial, pageSize: 10 };
    this.filterOptionsSupplierFinancial = { type: 'Excel', ignoreAccent: true };
    this.filterGridSupplierFinancial = { type: 'Excel' };
    this.gridLinesSupplierFinancial = 'Both';
    this.selectOptionsSupplierFinancial = { type: 'Single' };
    this.colsSupplierFinancial = [];

    this.itemsPageSupplierContact = this.projectSettings.itemsPage();
    this.pageSettingsSupplierContact = { pageSizes: this.itemsPageSupplierContact, pageSize: 10 };
    this.filterOptionsSupplierContact = { type: 'Excel', ignoreAccent: true };
    this.filterGridSupplierContact = { type: 'Excel' };
    this.gridLinesSupplierContact = 'Both';
    this.selectOptionsSupplierContact = { type: 'Single' };
    this.colsSupplierContact = [];

    this.submitted = false;
    this.actionForm = Action.None;
    this.actionContact = Action;
    this.pageRedirect = '/catalogs/suppliers';

  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.colsSupplierFinancial = [
      { field: 'account', header: 'No. Cuenta', width: 100 },
      { field: 'clabe', header: 'Clabe', width: 100 },
      { field: 'bankName', header: 'Banco', width: 100 },
      { field: 'currencyName', header: 'Moneda', width: 100 }
    ];

    this.colsSupplierContact = [
      { field: 'fullName', header: 'Nombre', width: 200 },
      { field: 'phone1', header: 'Teléfono 1', width: 100 },
      { field: 'phone2', header: 'Teléfono 2', width: 100 },
      { field: 'movil1', header: 'Celular 1', width: 100 },
      { field: 'movil2', header: 'Celular 2', width: 100 },
      { field: 'email', header: 'Email', width: 200 }
    ];

    this.showForm();
  }

  initObjects() {
    this.supplier = {
      id: 0,
      supplierTypeId: null,
      countryId: null,
      stateProvinceId: null,
      cityId: null,
      name: '',
      rfcId: '',
      legalName: '',
      street: '',
      neighborhoodName: '',
      zipCode: '',
      websiteUrl: ''
    };

    this.supplierLegalRepresentative = {
      id: 0,
      firstName: '',
      lastName: '',
      curpId: '',
      rfcId: '',
      email: ''
    };

    this.listSupplierFinancials = [];

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
      // supplierRecordDocuments: [{
      //   id: 0,
      //   path: '',
      //   supplierDocumentTypeId: 0,
      //   supplierRecordId: 0,
      //   systemName: '',
      //   userName: ''
      // }]
    };

    this.fiscalSituationDocument = {
      id: 0,
      name: '',
      description: '',
      required: false,
      accountStatus: ''
    };

    this.accountStatusDocument = {
      id: 0,
      name: '',
      description: '',
      required: false,
      allowedExtensions: ''
    };

    this.listSupplierContacts = [];
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addSupplier':
            this.titleHeader = 'Agregar Proveedor';
            this.initObjects();
            this.actionForm = Action.Create;
            break;
          case 'editSupplier':
            this.titleHeader = 'Editar Proveedor';
            this.actionForm = Action.Edit;
            this.getSupplierById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });

    this.getProfilesSystem();
    this.getCountries();
    this.getPlants();
    this.getSupplierPaymentTerms();
    this.getSupplierDocumentTypes();
  }

  getSupplierById(supplierId) {
    this.spinner.show();
    this.supplierService.getSupplierById(supplierId).subscribe(
      data => {
        this.supplier = data;
        this.getSupplierLegalRepresentativeBySupplierId(this.supplier.id);
        this.getSupplierFinancialsBySupplierId(this.supplier.id);
        this.getSupplierRecordBySupplierId(this.supplier.id);
        this.getSupplierContactsBySupplierId(this.supplier.id);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSupplierLegalRepresentativeBySupplierId(supplierId) {
    this.spinner.show();
    this.supplierLegalRepresentativeService.getSupplierLegalRepresentativeBySupplierId(supplierId).subscribe(
      data => {
        this.supplierLegalRepresentative = data != null ? data : this.supplierLegalRepresentative;
        this.supplierLegalRepresentative.firstName =
          this.supplierLegalRepresentative.firstName != null ? this.supplierLegalRepresentative.firstName : '';
        this.supplierLegalRepresentative.lastName =
          this.supplierLegalRepresentative.lastName != null ? this.supplierLegalRepresentative.lastName : '';
        this.supplierLegalRepresentative.curpId =
          this.supplierLegalRepresentative.curpId != null ? this.supplierLegalRepresentative.curpId : '';
        this.supplierLegalRepresentative.rfcId =
          this.supplierLegalRepresentative.rfcId != null ? this.supplierLegalRepresentative.rfcId : '';
        this.supplierLegalRepresentative.email =
          this.supplierLegalRepresentative.email != null ? this.supplierLegalRepresentative.email : '';
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSupplierFinancialsBySupplierId(supplierId) {
    this.spinner.show();
    this.supplierFinancialService.getSupplierFinancialsBySupplierId(supplierId).subscribe(
      data => {
        this.listSupplierFinancials = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSupplierRecordBySupplierId(supplierId) {
    this.spinner.show();
    this.supplierRecordService.getSupplierRecordBySupplierId(supplierId).subscribe(
      data => {
        this.supplierRecord = data;
        this.supplierRecord.notes = this.supplierRecord.notes !== null ? this.supplierRecord.notes : '';
        this.getSupplierRecordDocumentsByRecordId(this.supplierRecord.id);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSupplierRecordDocumentsByRecordId(recordId) {
    this.spinner.show();
    this.supplierRecordDocumentService.getSupplierRecordDocumentsByRecordId(recordId).subscribe(
      data => {
        this.supplierRecord.supplierRecordDocuments = data;
        data.forEach(item => {
          const supplierDocumentType = this.listSupplierDocumentType.filter(o => o.id === item.supplierDocumentTypeId)[0];
          switch (supplierDocumentType.name) {
            case 'Constancia de situación fiscal':
              this.supplierRecord.fiscalSituation = item.userName;
              break;
            case 'Estado de cuenta':
              this.supplierRecord.accountStatus = item.userName;
              break;
          }
        });
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getSupplierContactsBySupplierId(supplierValue) {
    this.spinner.show();
    this.supplierContactService.getSupplierContactsBySupplierId(supplierValue).subscribe(
      data => {
        this.listSupplierContacts = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getProfilesSystem() {
    this.spinner.show();
    this.supplierTypeService.getSupplierTypes().subscribe(
      data => {
        this.listSupplierType = data;
        this.supplierTypeObj.value = this.actionForm === Action.Edit ? this.supplier.supplierTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringSupplierType: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listSupplierType, query);
  }

  getCountries() {
    this.spinner.show();
    this.countryService.getCountries().subscribe(
      data => {
        this.listCountries = data;
        this.countryObj.value = this.actionForm === Action.Edit ? this.supplier.countryId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeCountry() {
    this.listStatesProvinces = [];
    const countryValue = this.countryObj.value;
    if (countryValue !== null) {
      this.getStatesProvinces(countryValue);
    }
  }

  filteringCountry: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCountries, query);
  }

  getStatesProvinces(countryId) {
    this.spinner.show();
    this.stateProvinceService.getStatesProvinces(countryId).subscribe(
      data => {
        this.listStatesProvinces = data;
        this.stateProvinceObj.value = this.actionForm === Action.Edit ? this.supplier.stateProvinceId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeStatesProvinces() {
    this.listCities = [];
    const stateValue = this.stateProvinceObj.value;
    if (stateValue !== null) {
      this.getCities(stateValue);
    }
  }

  filteringStatesProvinces: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listStatesProvinces, query);
  }

  getCities(stateId) {
    this.spinner.show();
    this.cityService.getCities(stateId).subscribe(
      data => {
        this.listCities = data;
        this.cityObj.value = this.actionForm === Action.Edit ? this.supplier.cityId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCities: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCities, query);
  }

  getPlants() {
    this.spinner.show();
    this.plantService.getPlants().subscribe(
      data => {
        this.listPlants = data;
        this.plantObj.value = this.actionForm === Action.Edit ? this.supplier.plantId : null;
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

  getSupplierPaymentTerms() {
    this.spinner.show();
    this.supplierPaymentTermService.getSupplierPaymentTerms().subscribe(
      data => {
        this.listSupplierPaymentTerm = data;
        this.supplierPaymentTermObj.value = this.actionForm === Action.Edit ? this.supplier.supplierPaymentTermId : null;
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

  getSupplierDocumentTypes() {
    this.spinner.show();
    this.supplierDocumentTypeService.getSupplierDocumentTypes().subscribe(
      data => {
        this.listSupplierDocumentType = data;

        this.listSupplierDocumentType.forEach(element => {
          switch (element.name) {
            case 'Constancia de situación fiscal':
              this.fiscalSituationDocument.id = element.id;
              this.fiscalSituationDocument.name = element.name;
              this.fiscalSituationDocument.description = element.description;
              this.fiscalSituationDocument.required = element.required;
              this.fiscalSituationDocument.allowedExtensions = element.allowedExtensions;
              break;
            case 'Estado de cuenta':
              this.accountStatusDocument.id = element.id;
              this.accountStatusDocument.name = element.name;
              this.accountStatusDocument.description = element.description;
              this.accountStatusDocument.required = element.required;
              this.accountStatusDocument.allowedExtensions = element.allowedExtensions;
              break;
          }
        });

        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  fiscalSituationSelect(supplierDocumentTypeId, event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.supplier.accountStatus = '';
    this.files = this.files.filter(o => o.supplierDocumentTypeId !== supplierDocumentTypeId);

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadFiscalSituation.nativeElement.value = '';
      return;
    }

    this.supplierRecord.fiscalSituationId = parseInt(supplierDocumentTypeId, 0);
    this.supplierRecord.fiscalSituation = fileName;
    const fileItem = { supplierDocumentTypeId, file };
    this.files.push(fileItem);
  }

  accountStatusSelect(supplierDocumentTypeId, event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.supplier.accountStatus = '';
    this.files = this.files.filter(o => o.supplierDocumentTypeId !== supplierDocumentTypeId);

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadAccountStatus.nativeElement.value = '';
      return;
    }

    this.supplierRecord.accountStatusId = parseInt(supplierDocumentTypeId, 0);
    this.supplierRecord.accountStatus = fileName;
    const fileItem = { supplierDocumentTypeId, file };
    this.files.push(fileItem);
  }

  openModalSupplierFinancials(action: Action, item: any) {
    const modalRef = this.modalService.open(SuppliersFinancialModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nueva Información Financiera';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Información Financiera';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      if (e !== null) {
        this.listSupplierFinancials.push(e);
        if (this.listSupplierFinancials.length > 1) {
          this.gridSupplierFinancials.refresh();
        }
      }
    });
  }

  openModalSupplierContacts(action: Action, item: any) {
    const modalRef = this.modalService.open(SuppliersContactModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nuevo Contacto';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Contacto';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      if (e !== null) {
        if (!this.listSupplierContacts.some(o => o.id === e.id)) {
          this.listSupplierContacts.push(e);
        } else {
          this.listSupplierContacts = this.listSupplierContacts.filter(o => o.id !== e.id);
          this.listSupplierContacts.push(e);
        }
        // this.listSupplierContacts.push(e);
        if (this.listSupplierContacts.length > 1) {
          this.gridSupplierContacts.refresh();
        }
      }
    });
  }

  saveForm() {
    this.submitted = true;

    if (this.formSupplier.invalid) {
      this.accSupplier.expandAll();
      return;
    }

    const supplierSave: any = {};

    // Supplier Main
    supplierSave.id = this.supplier.id;
    supplierSave.supplierTypeId = this.supplier.supplierTypeId;
    supplierSave.countryId = this.supplier.countryId;
    supplierSave.stateProvinceId = this.supplier.stateProvinceId;
    supplierSave.cityId = this.supplier.cityId;
    supplierSave.name = this.supplier.name != null ? this.supplier.name.trim() : null;
    supplierSave.rfcId = this.supplier.rfcId != null ? this.supplier.rfcId.trim() : null;
    supplierSave.legalName = this.supplier.legalName != null ? this.supplier.legalName.trim() : null;
    supplierSave.street = this.supplier.street != null ? this.supplier.street.trim() : null;
    supplierSave.neighborhoodName = this.supplier.neighborhoodName != null ? this.supplier.neighborhoodName.trim() : null;
    supplierSave.zipCode = this.supplier.zipCode != null ? this.supplier.zipCode.trim() : null;
    supplierSave.websiteUrl = '';

    // Legal Representative
    supplierSave.supplierLegalRepresentative = this.supplierLegalRepresentative;

    // Financial
    const supplierFinancialArray = [];
    this.listSupplierFinancials.forEach(item => {
      supplierFinancialArray.push({
        id: item.id,
        account: isNaN(item.account) ? 0 : parseInt(item.account, 0),
        clabe: isNaN(item.clabe) ? 0 : parseInt(item.clabe, 0),
        bankId: item.bankId,
        currencyId: item.currencyId
      });
    });
    supplierSave.supplierFinancials = supplierFinancialArray;

    // Record
    supplierSave.supplierRecord = this.supplierRecord;

    if (this.files.length !== 0) {
      this.files.forEach(item => {
        supplierSave.supplierRecord.supplierRecordDocuments.push({
          id: item.id !== undefined ? item.id : 0,
          supplierDocumentTypeId: parseInt(item.supplierDocumentTypeId, 0),
          userName: item.file.name,
          systemName: item.systemName !== undefined ? item.systemName : '',
          path: item.path !== undefined ? item.path : ''
        });
      });
    }

    // Contacts
    const supplierContactArray = [];
    this.listSupplierContacts.forEach(item => {
      supplierContactArray.push({
        id: item.id,
        firstName: item.firstName != null ? item.firstName.trim() : null,
        lastName: item.lastName != null ? item.lastName.trim() : null,
        phone1: item.phone1 != null ? item.phone1.trim() : null,
        phone2: item.phone2 != null ? item.phone2.trim() : null,
        movil1: item.movil1 != null ? item.movil1.trim() : null,
        movil2: item.movil2 != null ? item.movil2.trim() : null,
        email: item.email != null ? item.email.trim() : null,
      });
    });
    supplierSave.supplierContacts = supplierContactArray;

    supplierSave.createBy = this.currentUser.userName;

    const formData = new FormData();

    this.files.forEach(item => {
      formData.append('files', item.file, item.file.name);
    });

    formData.append('supplierSave', JSON.stringify(supplierSave));

    this.spinner.show();
    switch (this.actionForm) {
      case Action.Create:
        this.supplierService.saveSupplier(formData).subscribe(data => {
          this.alertMessageService.successMessage('Proveedor guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.supplierService.updateSupplier(formData).subscribe(data => {
          this.alertMessageService.successMessage('Proveedor editado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

}
