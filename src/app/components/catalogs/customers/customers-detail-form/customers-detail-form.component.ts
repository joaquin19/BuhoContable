import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  SessionService, AlertMessageService
} from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action } from '@app/core/enums';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { PageSettingsModel, GridLine, FilterSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { CustomerTypeService } from '../../../../core/services/customer-type.service';
import { CustomerDocumentTypeService } from '../../../../core/services/customer-document-type.service';
import { CustomerLegalRepresentativeService } from '../../../../core/services/customer-legal-representative.service';
import { CustomerFinancialService } from '../../../../core/services/customer-financial.service';
import { CustomerRecordService } from '../../../../core/services/customer-record.service';
import { CustomerRecordDocumentService } from '../../../../core/services/customer-record-document.service';
import { CustomerContactService } from '../../../../core/services/customer-contact.service';

@Component({
  selector: 'app-customers-detail-form',
  templateUrl: './customers-detail-form.component.html',
  styleUrls: ['./customers-detail-form.component.scss']
})
export class CustomersDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;

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
  public actionForm: Action;
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
    this.pageRedirect = '/catalogs/clients';

  }

  ngOnInit(): void {
    this.customer = this.item;
    this.currentUser = this.sessionService.userProfile();

    this.colsCustomerFinancial = [
      { field: 'account', header: 'No. Cuenta', width: 100 },
      { field: 'clabe', header: 'Clabe', width: 100 },
      { field: 'bankName', header: 'Banco', width: 100 },
      { field: 'currencyName', header: 'Moneda', width: 100 }
    ];

    this.colsCustomerContact = [
      { field: 'fullName', header: 'Nombre', width: 200 },
      { field: 'phone1', header: 'Teléfono 1', width: 100 },
      { field: 'phone2', header: 'Teléfono 2', width: 100 },
      { field: 'movil1', header: 'Celular 1', width: 100 },
      { field: 'movil2', header: 'Celular 2', width: 100 },
      { field: 'email', header: 'Email', width: 200 }
    ];

    this.getCustomerLegalRepresentativeByCustomerId(this.customer.id);
    this.getCustomerFinancialsByCustomerId(this.customer.id);
    this.getCustomerRecordByCustomerId(this.customer.id);
    this.getCustomerContactsByCustomerId(this.customer.id);
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
      email: ''
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
      customerRecordDocuments: [{
        id: 0,
        path: '',
        customerDocumentTypeId: 0,
        customerRecordId: 0,
        systemName: '',
        userName: ''
      }]
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

}
