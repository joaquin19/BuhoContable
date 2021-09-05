import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { AlertMessageService, MerchandiseReceptionHeaderService, MerchandiseReceptionDetailService, SessionService } from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PageSettingsModel, GridLine, FilterSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { MerchandiseReceptionEditionModalComponent } from '../merchandise-reception-edition-modal/merchandise-reception-edition-modal.component';
import Swal from 'sweetalert2';
import { MerchandiseReceptionDocumentService } from '@app/core/services/merchandise-reception-document.service';
import { MerchandiseReceptionDetailModalComponent } from '../merchandise-reception-detail-modal/merchandise-reception-detail-modal.component';

@Component({
  selector: 'app-merchandise-reception-form',
  templateUrl: './merchandise-reception-form.component.html',
  styleUrls: ['./merchandise-reception-form.component.scss']
})
export class MerchandiseReceptionFormComponent implements OnInit {

  @Input() item: any;
  @ViewChild('formMerchandiseReception', { static: false })
  public formMerchandiseReception: NgForm;
  @ViewChild('supplierObj', { static: false })
  public supplierObj: DropDownListComponent;
  @ViewChild('gridMerchandiseReceptionEdition', { static: false })
  gridMerchandiseReceptionEdition: GridComponent;

  /***** grid *****/
  public colsMerchandiseEdition: any;
  public itemsPageMerchandiseEdition: any;
  public pageSettingsMerchandiseEdition: PageSettingsModel;
  public filterOptionsMerchandiseEdition: FilterSettingsModel;
  public filterGridMerchandiseEdition: any;
  public gridLinesMerchandiseEdition: GridLine;
  public selectOptionsMerchandiseEdition: any;
  /***** fin grid *****/

  public titleHeader: string;
  public listHeaders: any;
  public merchandiseReception: any;
  public articles: any;
  public merchandise: any;
  public merchandiseRecord: any;
  public listMerchandiseReceptionEdition: any;
  public listMerchandiseDocumentType: any;
  public submitted: boolean;
  public maxLengthNotes: number;
  public pageRedirect: string;
  public actionForm: any;
  public currentUser: any;
  public receptionDate: NgbDateStruct;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private merchandiseReceptionHeaderService: MerchandiseReceptionHeaderService,
    private merchandiseReceptionDetailService: MerchandiseReceptionDetailService,
    private merchandiseReceptionDocumentService: MerchandiseReceptionDocumentService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private router: Router,
    private modalService: NgbModal,
    private calendar: NgbCalendar
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.merchandiseReception = {
      folio: '',
      purchaseOrderHeaderId: 0,
      supplierId: 0,
      statusId: 0,
      statusName: '',
      supplierName: '',
      receptionDate: '1900-01-01'
    };
    this.articles = {
      id: 0,
      merchandiseReceptionHeaderId: 0,
      purchaseOrderHeaderId: 0,
      articleId: 0,
      code: '',
      fullName: '',
      description: '',
      quantity: 0,
      receivedQuantity: 0,
      pendingQuantity: 0,
      lastRecord: 0,
      subTotal: 0,
      total: 0
    };
    this.listMerchandiseReceptionEdition = [];
    this.listMerchandiseDocumentType = [];
    this.submitted = false;
    this.receptionDate = this.calendar.getToday();
    this.maxLengthNotes = 200;
    this.pageRedirect = '/purchases/merchandise-reception';
    this.actionForm = Action;

    /***** grid *****/
    this.itemsPageMerchandiseEdition = this.projectSettings.itemsPage();
    this.pageSettingsMerchandiseEdition = { pageSizes: this.itemsPageMerchandiseEdition, pageSize: 10 };
    this.filterOptionsMerchandiseEdition = { type: 'Excel', ignoreAccent: true };
    this.filterGridMerchandiseEdition = { type: 'Excel' };
    this.gridLinesMerchandiseEdition = 'Both';
    this.selectOptionsMerchandiseEdition = { type: 'Single' };
    this.colsMerchandiseEdition = [];
    /***** fin grig *****/
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.colsMerchandiseEdition = [
      { field: 'fullName', header: 'Artículo', width: 300 },
      { field: 'quantity', header: 'Cantidad Solicitada', width: 150 },
      { field: 'receivedQuantity', header: 'Cantidad Recibida', width: 150 },
      { field: 'pendingQuantity', header: 'Cantidad Pendiente', width: 150 },
      { field: 'createdOn', header: 'Fecha Recepción', width: 150 },
    ];
    this.showForm();
  }

  listMerchandiseReception() {
    this.router.navigate([this.pageRedirect]);
  }

  confirmDelete(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea eliminar el artículo <strong>${item.fullName}</strong> con la cantidad <strong>${item.receivedQuantity}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.deleteMerchandiseReceptionDetail(item.merchandiseReceptionHeaderId, item.id, item.purchaseOrderHeaderId);
      }
    });
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addMerchandiseReception':
            this.titleHeader = 'Recepción de Mercancía';
            this.merchandiseReception = {
              id: 0,
              material: '',
              quantity: '',
              quantityReceived: null,
              quantityPending: null
            };
            this.actionForm = Action.Create;
            break;
          case 'editMerchandiseReception':
            this.titleHeader = 'Recepción de Mercancía';
            this.actionForm = Action.Edit;
            this.getMerchandiseReception(params.id);
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

  getMerchandiseReception(purchaseOrderHeaderId) {
    this.spinner.show();
    this.merchandiseReceptionHeaderService.getMerchandiseReceptionByPurchaseOrderId(purchaseOrderHeaderId).subscribe(
      data => {
        this.merchandiseReception = data;
        this.getMerchandiseReceptionDetail();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getMerchandiseReceptionDetail() {
    this.spinner.show();
    this.merchandiseReceptionDetailService.getMerchandiseReceptionDetailByPOH(this.merchandiseReception.purchaseOrderHeaderId).subscribe(
      data => {
        this.articles = data;
        this.spinner.hide();
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(MerchandiseReceptionEditionModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });
    modalRef.componentInstance.title = 'Recepcinar Artículo';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      if (e !== null) {
        this.getMerchandiseReceptionDetail();
      }
    });
  }

  openModalDetail(action: Action, item: any) {
    const modalRef = this.modalService.open(MerchandiseReceptionDetailModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });
    modalRef.componentInstance.title = 'Detalle de Recepción';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      if (e !== null) {
        this.getMerchandiseReceptionDetail();
      }
    });
  }

  saveForm() {
    this.submitted = true;

    if (this.formMerchandiseReception.invalid) {
      return;
    }

    const merchandiseReceptionSave: any = {};

    merchandiseReceptionSave.id = this.merchandiseReception.id;
    merchandiseReceptionSave.name = this.merchandiseReception.name.trim();
    merchandiseReceptionSave.description = this.merchandiseReception.description.trim();
    merchandiseReceptionSave.date = moment(this.receptionDate).format('YYYY-MM-DD');
    merchandiseReceptionSave.createBy = this.currentUser.userName;

  }

  getMerchandiseReceptionDocumentsByDetail(merchandiseReceptionId, merchandiseReceptionDetailId, purchaseOrderHeaderId) {
    this.spinner.show();
    this.merchandiseReceptionDocumentService.getMerchandiseReceptionDocumentsByMRD(
      merchandiseReceptionId,
      merchandiseReceptionDetailId).subscribe(
        data => {
          const merchandiseReceptionDelete: any = {};
          merchandiseReceptionDelete.merchandiseReceptionHeaderId = merchandiseReceptionId;
          merchandiseReceptionDelete.merchandiseReceptionDetailId = merchandiseReceptionDetailId;
          merchandiseReceptionDelete.deleteBy = this.currentUser.userName;
          merchandiseReceptionDelete.merchandiseReceptionDocument = data;
          this.spinner.hide();
        },
        error => {
          this.alertMessageService.errorMessage(error.message);
        });
  }

  deleteMerchandiseReceptionDetail(merchandiseReceptionId, merchandiseReceptionDetailId, purchaseOrderHeaderId) {
    this.spinner.show();
    this.merchandiseReceptionDetailService.deleteMerchandiseReceptionDetail(
      merchandiseReceptionId, merchandiseReceptionDetailId, this.currentUser.userName).subscribe(data => {
        this.alertMessageService.successMessage('La recepción de mercancía se ha eliminado correctamente.');
        this.getMerchandiseReception(purchaseOrderHeaderId);
        this.spinner.hide();
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}

