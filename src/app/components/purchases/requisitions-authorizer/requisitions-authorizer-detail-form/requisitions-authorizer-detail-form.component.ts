import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { ProjectSettings } from '@app/core/constants';
import {
  AlertMessageService, SessionService, AuthorizationProcessService,
  RequisitionHeaderService, RequisitionDetailService, PlantService, SupplierRecordService, TaxService
} from '@app/core/services';
import { RequisitionDocumentService } from '@app/core/services/requisition-document.service';
import { RequisitionDetailTaxService } from '@app/core/services/requisition-detail-tax.service';
import { FilterSettingsModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import * as numeral from 'numeral';

@Component({
  selector: 'app-requisitions-authorizer-detail-form',
  templateUrl: './requisitions-authorizer-detail-form.component.html',
  styleUrls: ['./requisitions-authorizer-detail-form.component.scss'],
  providers: [NgbCarouselConfig]
})
export class RequisitionsAuthorizerDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('gridRequisitionDetail', { static: false })
  public gridRequisitionDetail: GridComponent;
  @ViewChild('carousel') carousel: any;

  /***** carousel *****/
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = true;
  /***** fin carousel *****/

  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public titleHeader: string;
  public listHeaders: any;
  public requisition: any;
  public listRequisitionDetail: any;
  public listRequisitions: any;
  public pageRedirect: string;
  public currentUser: any;
  public maxLengthObservations: number;
  public submittedRequisition: boolean;
  public authorizationStatusReject: any;
  public authorizationStatusId: AuthorizationStatus;
  public requisitionDocument: any;
  public requisitionImages: any;
  public typesImages: string[];
  public listDocumentSelected: any;
  public listTaxesAdded: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public dataEvent: any;
  public imageNameSelected: string;
  public total: any;
  public subTotal: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private requisitionHeaderService: RequisitionHeaderService,
    private requisitionDetailService: RequisitionDetailService,
    private authorizationProcessService: AuthorizationProcessService,
    private requisitionDocumentService: RequisitionDocumentService,
    private requisitionDetailTaxService: RequisitionDetailTaxService,
    private taxService: TaxService,
    private plantService: PlantService,
    private supplierRecordService: SupplierRecordService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.requisitionDocument = [];
    this.requisitionImages = [];
    this.titleHeader = '';
    this.listHeaders = [];
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.cols = [];
    this.maxLengthObservations = 200;
    this.requisition = {};
    this.listRequisitions = [];
    this.listRequisitionDetail = [];
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
    this.typesImages = ['.png', '.jpg', '.jpeg'];
    this.dataEvent = { current: 'slideId_0' };
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'code', header: 'NO. PARTE', width: 80 },
      { field: 'name', header: 'DESCRIPCIÓN', width: 250 },
      { field: 'quantity', header: 'CANTIDAD', width: 80 },
      { field: 'unitMeasureName', header: 'U/M', width: 80 },
      { field: 'dimension', header: 'DIMENSIÓN', width: 100, visible: false },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'subTotal', header: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'total', header: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000', visible: false }
    ];
    this.requisition.observation = '';
    this.showForm();
  }

  showForm() {
    this.titleHeader = 'Detalle de Requisición';
    this.getRequisitionById(this.item.valueId);
    this.getRequisitionDocuments(this.item.valueId);
  }

  getRequisitionById(requisitionId) {
    this.spinner.show();
    this.requisitionHeaderService.getRequisitionById(requisitionId).subscribe(
      data => {
        this.listRequisitions = data;
        this.getSupplierRecordBySupplierId(data.supplierId);
        this.getRequisitionDetailByHeaderId(data.id);
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
        this.requisition.plantName = data.filter(o => o.id === plantId)[0].name;
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
        this.listRequisitionDetail = data;
        this.getRequisitionDetailTaxByHeader(requisitionHeaderId);
        this.calculationTotal();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  processAuthorizationForm(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;
    this.submittedRequisition = true;
    const authorizationSave: any = {};

    const requisitionsArray = [];
    requisitionsArray.push({
      id: this.item.id,
      valueId: this.item.valueId
    });

    if (this.requisition.observation === '' && authorizationStatusId === AuthorizationStatus.Rejected) {
      return false;
    }

    authorizationSave.processTypeId = ProcessType.Requisition;
    authorizationSave.authorizationStatusId = authorizationStatusId;
    authorizationSave.detail = requisitionsArray;
    authorizationSave.observation = this.requisition.observation;
    authorizationSave.createBy = this.currentUser.userName;

    console.log('authorizationSave', authorizationSave);

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(authorizationSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Requisición Autorizada correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Requisición Rechazada correctamente.');
        }
        this.spinner.hide();
        this.saveItem.emit(true);
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });

  }

  public downloadPDF() {
    const dateCreateOn = (moment(`${this.listRequisitions.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')).split('/');
    const requisitionNamePDF = `R${this.listRequisitions.id}(${this.listRequisitions.supplierName})${dateCreateOn[0]}${dateCreateOn[1]}${dateCreateOn[2]}.pdf`;
    const documentDefinition =
      this.requisitionHeaderService.getDocumentDefinition(this.cols, this.listRequisitionDetail,
        this.listRequisitions, this.listTaxesAdded);
    pdfMake.createPdf(documentDefinition).download(requisitionNamePDF);
  }

  public showPDF() {
    const documentDefinition =
      this.requisitionHeaderService.getDocumentDefinition(this.cols, this.listRequisitionDetail,
        this.listRequisitions, this.listTaxesAdded);
    pdfMake.createPdf(documentDefinition).open();
  }

  getRequisitionDocuments(requisitionId) {
    this.spinner.show();
    this.requisitionDocumentService.getRequisitionDocumentsByHeaderId(requisitionId).subscribe(
      data => {
        this.requisitionDocument = data;
        let imageExtension = '';
        this.requisitionImages = [];
        this.requisitionDocument.forEach(element => {
          imageExtension = (element.userName.substr(element.userName.lastIndexOf('.'))).toLowerCase();
          if (this.typesImages.indexOf(imageExtension) !== -1) {
            console.log('es imagen');
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

  downloadDocument(document) {
    this.spinner.show();
    console.log(document);
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
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
    this.calculationTotal();
  }

  calculationTotal() {
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listRequisitionDetail) {
      this.subTotal = numeral(numeral(this.subTotal).value() + item.subTotal).format('$0,0.0000');
      this.total = numeral(numeral(this.total).value() + item.total).format('$0,0.0000');
    }
  }

}
