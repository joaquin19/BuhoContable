import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertMessageService, SessionService, AuthorizationProcessService } from '@app/core/services';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-authorizer-purchase-orders-form',
  templateUrl: './authorizer-purchase-orders-form.component.html',
  styleUrls: ['./authorizer-purchase-orders-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorizerPurchaseOrdersFormComponent implements OnInit {

  @ViewChild('gridPurchaseOrders', { static: false })
  public gridPurchaseOrders: GridComponent;

  @Input() action: Action;
  @Input() processType: ProcessType;
  @Input() items: any;
  @Output() saveItem = new EventEmitter();

  public cols: any;
  public listHeaders: any;
  public listPurchaseOrders: any;
  public pageRedirect: string;
  public currentUser: any;
  public maxLengthObservations: number;
  public purchaseOrder: any;
  public submittedPurchaseOrder: boolean;
  public authorizationStatusReject: any;
  public authorizationStatusId: AuthorizationStatus;

  constructor(
    private alertMessageService: AlertMessageService,
    private authorizationProcessService: AuthorizationProcessService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.listHeaders = [];
    this.listPurchaseOrders = [];
    this.cols = [];
    this.maxLengthObservations = 200;
    this.submittedPurchaseOrder = false;
    this.purchaseOrder = {};
    this.authorizationStatusReject = AuthorizationStatus.Rejected;
    this.authorizationStatusId = AuthorizationStatus.None;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.cols = [
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'subTotal', header: 'SubTotal', width: 150, format: '$0,0.0000' },
      { field: 'total', header: 'Total', width: 150, format: '$0,0.0000' },
      { field: 'fullName', header: 'Creado Por', width: 250 },
      { field: 'createdOn', header: 'Fecha Creación', width: 150 }
    ];
    this.showForm();
    this.purchaseOrder.observation = '';
  }

  showForm() {
    this.listPurchaseOrders = this.items;
  }

  processAuthorizationForm(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;
    this.submittedPurchaseOrder = true;
    const authorizationSave: any = {};

    const purchaseOrdersArray = [];
    this.listPurchaseOrders.forEach(item => {
      purchaseOrdersArray.push({
        id: item.id,
        valueId: item.valueId
      });
    });

    if (this.purchaseOrder.observation === '' && authorizationStatusId === AuthorizationStatus.Rejected) {
      return false;
    }

    authorizationSave.processTypeId = ProcessType.PurchaseOrder;
    authorizationSave.authorizationStatusId = authorizationStatusId;
    authorizationSave.detail = purchaseOrdersArray;
    authorizationSave.observation = this.purchaseOrder.observation;
    authorizationSave.createBy = this.currentUser.userName;

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(authorizationSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Órdenes de Compra Autorizadas correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Órdenes de Compra Rechazadas correctamente.');
        }
        this.spinner.hide();
        this.saveItem.emit(true);
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
