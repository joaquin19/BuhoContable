import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  SessionService, AlertMessageService, SupplierTypeService, CountryService, StateProvinceService, CityService,
  PlantService, SupplierPaymentTermService, SupplierService, SupplierDocumentTypeService, SupplierLegalRepresentativeService,
  SupplierFinancialService, SupplierRecordService, SupplierRecordDocumentService, SupplierContactService

} from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action } from '@app/core/enums';
import { NgbModal, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { PageSettingsModel, GridLine, FilterSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';


@Component({
  selector: 'app-suppliers-detail-form',
  templateUrl: './suppliers-detail-form.component.html',
  styleUrls: ['./suppliers-detail-form.component.scss']
})
export class SuppliersDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;

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
    this.pageRedirect = '/catalogs/suppliers';

  }

  ngOnInit(): void {
    this.supplier = this.item;
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

    this.getSupplierLegalRepresentativeBySupplierId(this.supplier.id);
    this.getSupplierFinancialsBySupplierId(this.supplier.id);
    this.getSupplierRecordBySupplierId(this.supplier.id);
    this.getSupplierContactsBySupplierId(this.supplier.id);
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
      supplierRecordDocuments: [{
        id: 0,
        path: '',
        supplierDocumentTypeId: 0,
        supplierRecordId: 0,
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

    this.listSupplierContacts = [];
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


}
