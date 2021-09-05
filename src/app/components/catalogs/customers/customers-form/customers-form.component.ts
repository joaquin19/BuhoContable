import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  SessionService, AlertMessageService, CountryService, StateProvinceService, CityService,
  PlantService
} from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { CustomersFinancialModalComponent } from '../customers-financial-modal/customers-financial-modal.component';
import { CustomersContactModalComponent } from '../customers-contact-modal/customers-contact-modal.component';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action } from '@app/core/enums';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { PageSettingsModel, GridLine, FilterSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { CustomerTypeService } from '../../../../core/services/customer-type.service';
import { CustomerPaymentTermService } from '../../../../core/services/customer-payment-term.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerDocumentTypeService } from '../../../../core/services/customer-document-type.service';
import { CustomerLegalRepresentativeService } from '../../../../core/services/customer-legal-representative.service';
import { CustomerFinancialService } from '../../../../core/services/customer-financial.service';
import { CustomerRecordService } from '../../../../core/services/customer-record.service';
import { CustomerRecordDocumentService } from '../../../../core/services/customer-record-document.service';
import { CustomerContactService } from '../../../../core/services/customer-contact.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent implements OnInit {

  @ViewChild('formCustomer', { static: false })
  public formCustomer: NgForm;
  @ViewChild('accCustomer', { static: false })
  public accCustomer: NgbAccordion;
  @ViewChild('customerTypeObj', { static: false })
  public customerTypeObj: DropDownListComponent;
  @ViewChild('countryObj', { static: false })
  public countryObj: DropDownListComponent;
  @ViewChild('stateProvinceObj', { static: false })
  public stateProvinceObj: DropDownListComponent;
  @ViewChild('cityObj', { static: false })
  public cityObj: DropDownListComponent;
  @ViewChild('plantObj', { static: false })
  public plantObj: DropDownListComponent;
  @ViewChild('customerPaymentTermObj', { static: false })
  public customerPaymentTermObj: DropDownListComponent;
  @ViewChild('stateProvinceObj', { static: false })
  public fileUploadFiscalSituation: ElementRef;
  @ViewChild('fileUploadAccountStatus', { static: false })
  public fileUploadAccountStatus: ElementRef;
  @ViewChild('gridCustomerFinancials', { static: false })
  gridCustomerFinancials: GridComponent;
  @ViewChild('gridCustomerContacts', { static: false })
  gridCustomerContacts: GridComponent;
  @ViewChild('fileUploadOfficialIdentification', { static: false })
  public fileUploadOfficialIdentification: ElementRef;

  public customer: any;
  public customerLegalRepresentative: any;
  public listCustomerFinancials: any;
  public customerRecord: any;
  public fiscalSituationDocument: any;
  public accountStatusDocument: any;
  public listCustomerContacts: any;
  public listCustomerType: any;
  public listCountries: any;
  public listStatesProvinces: any;
  public listCities: any;
  public listPlants: any;
  public listCustomerPaymentTerm: any;
  public listCustomerDocumentType: any;
  public submitted: boolean;
  public titleHeader: string;
  public maxLengthNotes: number;
  public typesFiles: string[];
  public files: any;
  public fileIdentification: any;
  public actionForm: Action;
  public actionContact: any;
  public actionFinancialInfo: any;
  public actionModal = Action;
  public pageRedirect: string;
  public currentUser: any;

  public colsCustomerFinancial: any;
  public itemsPageCustomerFinancial: any;
  public pageSettingsCustomerFinancial: PageSettingsModel;
  public filterOptionsCustomerFinancial: FilterSettingsModel;
  public filterGridCustomerFinancial: any;
  public gridLinesCustomerFinancial: GridLine;
  public selectOptionsCustomerFinancial: any;

  public colsCustomerContact: any;
  public itemsPageCustomerContact: any;
  public pageSettingsCustomerContact: PageSettingsModel;
  public filterOptionsCustomerContact: FilterSettingsModel;
  public filterGridCustomerContact: any;
  public gridLinesCustomerContact: GridLine;
  public selectOptionsCustomerContact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private customerTypeService: CustomerTypeService,
    private countryService: CountryService,
    private stateProvinceService: StateProvinceService,
    private cityService: CityService,
    private plantService: PlantService,
    private customerPaymentTermService: CustomerPaymentTermService,
    private customerService: CustomerService,
    private customerDocumentTypeService: CustomerDocumentTypeService,
    private customerLegalRepresentativeService: CustomerLegalRepresentativeService,
    private customerFinancialService: CustomerFinancialService,
    private customerRecordService: CustomerRecordService,
    private customerRecordDocumentService: CustomerRecordDocumentService,
    private customerContactService: CustomerContactService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {

    this.initObjects();

    this.listCustomerType = [];
    this.listCountries = [];
    this.listStatesProvinces = [];
    this.listCities = [];
    this.listPlants = [];
    this.listCustomerPaymentTerm = [];
    this.listCustomerDocumentType = [];
    this.titleHeader = '';
    this.maxLengthNotes = 200;
    this.titleHeader = '';
    this.typesFiles = ['.pdf'];
    this.files = [];
    this.fileIdentification = [];

    this.itemsPageCustomerFinancial = this.projectSettings.itemsPage();
    this.pageSettingsCustomerFinancial = { pageSizes: this.itemsPageCustomerFinancial, pageSize: 10 };
    this.filterOptionsCustomerFinancial = { type: 'Excel', ignoreAccent: true };
    this.filterGridCustomerFinancial = { type: 'Excel' };
    this.gridLinesCustomerFinancial = 'Both';
    this.selectOptionsCustomerFinancial = { type: 'Single' };
    this.colsCustomerFinancial = [];

    this.itemsPageCustomerContact = this.projectSettings.itemsPage();
    this.pageSettingsCustomerContact = { pageSizes: this.itemsPageCustomerContact, pageSize: 10 };
    this.filterOptionsCustomerContact = { type: 'Excel', ignoreAccent: true };
    this.filterGridCustomerContact = { type: 'Excel' };
    this.gridLinesCustomerContact = 'Both';
    this.selectOptionsCustomerContact = { type: 'Single' };
    this.colsCustomerContact = [];

    this.submitted = false;
    this.actionForm = Action.None;
    this.actionContact = Action;
    this.actionFinancialInfo = Action;
    this.pageRedirect = '/catalogs/customers';

  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.colsCustomerFinancial = [
      { field: 'account', header: 'No. Cuenta', width: 150 },
      { field: 'clabe', header: 'Clabe', width: 150 },
      { field: 'bankName', header: 'Banco', width: 200 },
      { field: 'currencyName', header: 'Moneda', width: 150 },
      { field: 'swift', header: 'Swift', width: 100 },
      { field: 'contactName', header: 'Contacto', width: 200 },
      { field: 'email', header: 'Email', width: 250 },
      { field: 'phone', header: 'Teléfono', width: 150 }
    ];

    this.colsCustomerContact = [
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
    this.customer = {
      id: 0,
      customerTypeId: null,
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

    this.customerLegalRepresentative = {
      id: 0,
      firstName: '',
      lastName: '',
      curpId: '',
      rfcId: '',
      email: '',
      userName: '',
      systemName: '',
      path: ''
    };

    this.listCustomerFinancials = [];

    this.customerRecord = {
      id: 0,
      plantId: null,
      customerPaymentTermId: null,
      notes: '',
      fiscalSituationId: 0,
      fiscalSituation: '',
      accountStatusId: 0,
      accountStatus: '',
      customerRecordDocuments: []
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

    this.listCustomerContacts = [];
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addCustomer':
            this.titleHeader = 'Agregar Cliente';
            this.initObjects();
            this.actionForm = Action.Create;
            break;
          case 'editCustomer':
            this.titleHeader = 'Editar Cliente';
            this.actionForm = Action.Edit;
            this.getCustomerById(params.id);
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
    this.getCustomerPaymentTerms();
    this.getCustomerDocumentTypes();
  }

  getCustomerById(customerId) {
    this.spinner.show();
    this.customerService.getCustomerById(customerId).subscribe(
      data => {
        this.customer = data;
        this.getCustomerLegalRepresentativeByCustomerId(this.customer.id);
        this.getCustomerFinancialsByCustomerId(this.customer.id);
        this.getCustomerRecordByCustomerId(this.customer.id);
        this.getCustomerContactsByCustomerId(this.customer.id);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomerLegalRepresentativeByCustomerId(customerId) {
    this.spinner.show();
    this.customerLegalRepresentativeService.getCustomerLegalRepresentativeByCustomerId(customerId).subscribe(
      data => {
        this.customerLegalRepresentative = data != null ? data : this.customerLegalRepresentative;
        this.customerLegalRepresentative.firstName =
          this.customerLegalRepresentative.firstName != null ? this.customerLegalRepresentative.firstName : '';
        this.customerLegalRepresentative.lastName =
          this.customerLegalRepresentative.lastName != null ? this.customerLegalRepresentative.lastName : '';
        this.customerLegalRepresentative.curpId =
          this.customerLegalRepresentative.curpId != null ? this.customerLegalRepresentative.curpId : '';
        this.customerLegalRepresentative.rfcId =
          this.customerLegalRepresentative.rfcId != null ? this.customerLegalRepresentative.rfcId : '';
        this.customerLegalRepresentative.email =
          this.customerLegalRepresentative.email != null ? this.customerLegalRepresentative.email : '';
        this.customerLegalRepresentative.officialIdentification =
          this.customerLegalRepresentative.documentUserName != null ? this.customerLegalRepresentative.documentUserName : '';
        this.spinner.hide();

      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomerFinancialsByCustomerId(customerId) {
    this.spinner.show();
    this.customerFinancialService.getCustomerFinancialsByCustomerId(customerId).subscribe(
      data => {
        this.listCustomerFinancials = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomerRecordByCustomerId(customerId) {
    this.spinner.show();
    this.customerRecordService.getCustomerRecordByCustomerId(customerId).subscribe(
      data => {
        this.customerRecord = data;
        this.customerRecord.notes = this.customerRecord.notes !== null ? this.customerRecord.notes : '';
        this.getCustomerRecordDocumentsByRecordId(this.customerRecord.id);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomerRecordDocumentsByRecordId(recordId) {
    this.spinner.show();
    this.customerRecordDocumentService.getCustomerRecordDocumentsByRecordId(recordId).subscribe(
      data => {
        this.customerRecord.customerRecordDocuments = data;
        data.forEach(item => {
          const customerDocumentType = this.listCustomerDocumentType.filter(o => o.id === item.customerDocumentTypeId)[0];
          switch (customerDocumentType.name) {
            case 'Constancia de situación fiscal':
              this.customerRecord.fiscalSituation = item.userName;
              break;
            case 'Estado de cuenta':
              this.customerRecord.accountStatus = item.userName;
              break;
          }
        });
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomerContactsByCustomerId(customerValue) {
    this.spinner.show();
    this.customerContactService.getCustomerContactsByCustomerId(customerValue).subscribe(
      data => {
        this.listCustomerContacts = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getProfilesSystem() {
    this.spinner.show();
    this.customerTypeService.getCustomerTypes().subscribe(
      data => {
        this.listCustomerType = data;
        this.customerTypeObj.value = this.actionForm === Action.Edit ? this.customer.customerTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCustomerType: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomerType, query);
  }

  getCountries() {
    this.spinner.show();
    this.countryService.getCountries().subscribe(
      data => {
        this.listCountries = data;
        this.countryObj.value = this.actionForm === Action.Edit ? this.customer.countryId : null;
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
        this.stateProvinceObj.value = this.actionForm === Action.Edit ? this.customer.stateProvinceId : null;
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
        this.cityObj.value = this.actionForm === Action.Edit ? this.customer.cityId : null;
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
        this.plantObj.value = this.actionForm === Action.Edit ? this.customer.plantId : null;
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

  getCustomerPaymentTerms() {
    this.spinner.show();
    this.customerPaymentTermService.getCustomerPaymentTerms().subscribe(
      data => {
        this.listCustomerPaymentTerm = data;
        this.customerPaymentTermObj.value = this.actionForm === Action.Edit ? this.customer.customerPaymentTermId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCustomerPaymentTerms: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomerPaymentTerm, query);
  }

  getCustomerDocumentTypes() {
    this.spinner.show();
    this.customerDocumentTypeService.getCustomerDocumentTypes().subscribe(
      data => {
        this.listCustomerDocumentType = data;

        this.listCustomerDocumentType.forEach(element => {
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

  fiscalSituationSelect(customerDocumentTypeId, event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.customer.accountStatus = '';
    this.files = this.files.filter(o => o.customerDocumentTypeId !== customerDocumentTypeId);

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadFiscalSituation.nativeElement.value = '';
      return;
    }

    this.customerRecord.fiscalSituationId = parseInt(customerDocumentTypeId, 0);
    this.customerRecord.fiscalSituation = fileName;
    const fileItem = { customerDocumentTypeId, file };
    this.files.push(fileItem);
  }

  accountStatusSelect(customerDocumentTypeId, event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.customer.accountStatus = '';
    this.files = this.files.filter(o => o.customerDocumentTypeId !== customerDocumentTypeId);

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadAccountStatus.nativeElement.value = '';
      return;
    }

    this.customerRecord.accountStatusId = parseInt(customerDocumentTypeId, 0);
    this.customerRecord.accountStatus = fileName;
    const fileItem = { customerDocumentTypeId, file };
    this.files.push(fileItem);
  }

  openModalCustomerFinancials(action: Action, item: any) {
    const modalRef = this.modalService.open(CustomersFinancialModalComponent,
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
        if (!this.listCustomerFinancials.some(o => o.id === e.id) || (e.id === 0)) {
          this.listCustomerFinancials.push(e);
        } else {
          this.listCustomerFinancials = this.listCustomerFinancials.filter(o => o.id !== e.id);
          this.listCustomerFinancials.push(e);
        }
        if (this.listCustomerFinancials.length >= 1) {
          this.gridCustomerFinancials.refresh();
        }
      }
    });
  }

  openModalCustomerContacts(action: Action, item: any) {
    const modalRef = this.modalService.open(CustomersContactModalComponent,
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
        if (!this.listCustomerContacts.some(o => o.id === e.id) || (e.id === 0)) {
          this.listCustomerContacts.push(e);
        } else {
          this.listCustomerContacts = this.listCustomerContacts.filter(o => o.id !== e.id);
          this.listCustomerContacts.push(e);
        }
        if (this.listCustomerContacts.length > 1) {
          this.gridCustomerContacts.refresh();
        }
      }
    });
  }

  saveForm() {
    this.submitted = true;

    if (this.formCustomer.invalid) {
      this.accCustomer.expandAll();
      return;
    }

    const customerSave: any = {};

    const formData = new FormData();

    // Supplier Main
    customerSave.id = this.customer.id;
    customerSave.customerTypeId = this.customer.customerTypeId;
    customerSave.countryId = this.customer.countryId;
    customerSave.stateProvinceId = this.customer.stateProvinceId;
    customerSave.cityId = this.customer.cityId;
    customerSave.name = this.customer.name != null ? this.customer.name.trim() : null;
    customerSave.rfcId = this.customer.rfcId != null ? this.customer.rfcId.trim() : null;
    customerSave.legalName = this.customer.legalName != null ? this.customer.legalName.trim() : null;
    customerSave.street = this.customer.street != null ? this.customer.street.trim() : null;
    customerSave.neighborhoodName = this.customer.neighborhoodName != null ? this.customer.neighborhoodName.trim() : null;
    customerSave.zipCode = this.customer.zipCode != null ? this.customer.zipCode : null;
    customerSave.websiteUrl = '';

    // Legal Representative
    customerSave.customerLegalRepresentative = {};

    if ((this.customerLegalRepresentative.fullName !== null) || (this.customerLegalRepresentative.fullName === null)) {
      this.customerLegalRepresentative.fullName = '';
      customerSave.customerLegalRepresentative = this.customerLegalRepresentative;
    }

    this.fileIdentification.forEach(item => {
      formData.append('fileIdentification', item.file, item.file.name);
    });

    // Financial
    const customerFinancialArray = [];
    this.listCustomerFinancials.forEach(item => {
      customerFinancialArray.push({
        id: item.id,
        account: isNaN(item.account) ? 0 : parseInt(item.account, 0),
        clabe: isNaN(item.clabe) ? 0 : parseInt(item.clabe, 0),
        bankId: item.bankId,
        currencyId: item.currencyId,
        swift: (item.swift != null) ? item.swift.trim() : null,
        contactName: item.contactName.trim(),
        email: item.email,
        phone: item.phone
      });
    });
    customerSave.customerFinancials = customerFinancialArray;

    // Record
    customerSave.customerRecord = this.customerRecord;

    if (this.files.length !== 0) {
      this.files.forEach(item => {
        customerSave.customerRecord.customerRecordDocuments.push({
          id: item.id !== undefined ? item.id : 0,
          customerDocumentTypeId: parseInt(item.customerDocumentTypeId, 0),
          userName: item.file.name,
          systemName: item.systemName !== undefined ? item.systemName : '',
          path: item.path !== undefined ? item.path : ''
        });
      });
    }

    // Contacts
    const customerContactArray = [];
    this.listCustomerContacts.forEach(item => {
      customerContactArray.push({
        id: item.id,
        firstName: item.firstName != null ? item.firstName.trim() : null,
        lastName: item.lastName != null ? item.lastName.trim() : null,
        phone1: item.phone1 != null ? item.phone1 : null,
        phone2: item.phone2 != null ? item.phone2 : null,
        movil1: item.movil1 != null ? item.movil1 : null,
        movil2: item.movil2 != null ? item.movil2 : null,
        email: item.email != null ? item.email.trim() : null,
      });
    });
    customerSave.customerContacts = customerContactArray;

    customerSave.createBy = this.currentUser.userName;

    this.files.forEach(item => {
      formData.append('files', item.file, item.file.name);
    });

    formData.append('customerSave', JSON.stringify(customerSave));

    this.spinner.show();
    switch (this.actionForm) {
      case Action.Create:
        this.customerService.saveCustomer(formData).subscribe(data => {
          this.alertMessageService.successMessage('Cliente guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.customerService.updateCustomer(formData).subscribe(data => {
          this.alertMessageService.successMessage('Cliente editado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  officialIdentificationSelect(event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadOfficialIdentification.nativeElement.value = '';
      return;
    }

    // this.customerRecord.fiscalSituationId = parseInt(0);
    this.customerLegalRepresentative.officialIdentification = fileName;
    const fileItem = { file };
    this.fileIdentification.push(fileItem);
  }

}
