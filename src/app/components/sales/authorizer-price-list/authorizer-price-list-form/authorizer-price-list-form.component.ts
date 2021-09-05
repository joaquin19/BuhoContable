import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { AlertMessageService, SessionService, AuthorizationProcessService } from '@app/core/services';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-authorizer-price-list-form',
  templateUrl: './authorizer-price-list-form.component.html',
  styleUrls: ['./authorizer-price-list-form.component.scss']
})
export class AuthorizerPriceListFormComponent implements OnInit {

  @ViewChild('gridPriceList', { static: false })
  public gridPriceList: GridComponent;

  @Input() action: Action;
  @Input() processType: ProcessType;
  @Input() items: any;
  @Output() saveItem = new EventEmitter();

  public cols: any;
  public listHeaders: any;
  public listPriceList: any;
  public pageRedirect: string;
  public currentUser: any;
  public maxLengthObservations: number;
  public priceList: any;
  public submittedPriceList: boolean;
  public authorizationStatusReject: any;
  public authorizationStatusId: AuthorizationStatus;

  constructor(
    private alertMessageService: AlertMessageService,
    private authorizationProcessService: AuthorizationProcessService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.listHeaders = [];
    this.listPriceList = [];
    this.cols = [];
    this.maxLengthObservations = 200;
    this.submittedPriceList = false;
    this.priceList = {};
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
    this.priceList.observation = '';
  }

  showForm() {
    this.listPriceList = this.items;
  }

  priceListAuthorizationForm(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;
    this.submittedPriceList = true;
    const authorizationSave: any = {};

    const priceListArray = [];
    this.listPriceList.forEach(item => {
      priceListArray.push({
        id: item.id,
        valueId: item.valueId
      });
    });

    if (this.priceList.observation === '' && authorizationStatusId === AuthorizationStatus.Rejected) {
      return false;
    }

    authorizationSave.processTypeId = ProcessType.Prices;
    authorizationSave.authorizationStatusId = authorizationStatusId;
    authorizationSave.detail = priceListArray;
    authorizationSave.observation = this.priceList.observation;
    authorizationSave.createBy = this.currentUser.userName;

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(authorizationSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Lista de Precios Autorizadas correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Lista de Precios Rechazadas correctamente.');
        }
        this.spinner.hide();
        this.saveItem.emit(true);
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
