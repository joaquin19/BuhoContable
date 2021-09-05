import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessageService, SessionService, AuthorizationProcessService } from '@app/core/services';
import { Action, AuthorizationStatus, ProcessType } from '@app/core/enums';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-requisitions-authorizer-form',
  templateUrl: './requisitions-authorizer-form.component.html',
  styleUrls: ['./requisitions-authorizer-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequisitionsAuthorizerFormComponent implements OnInit {

  @ViewChild('gridRequisitions', { static: false })
  public gridRequisitions: GridComponent;

  @Input() action: Action;
  @Input() processType: ProcessType;
  @Input() items: any;
  @Output() saveItem = new EventEmitter();

  public cols: any;
  public listHeaders: any;
  public listRequisitions: any;
  public pageRedirect: string;
  public currentUser: any;
  public maxLengthObservations: number;
  public requisition: any;
  public submittedRequisition: boolean;
  public authorizationStatusReject: any;
  public authorizationStatusId: AuthorizationStatus;

  constructor(
    private router: Router,
    private alertMessageService: AlertMessageService,
    private authorizationProcessService: AuthorizationProcessService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.listHeaders = [];
    this.listRequisitions = [];
    this.cols = [];
    this.maxLengthObservations = 200;
    this.requisition = {};
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
    this.requisition.observation = '';
    this.showForm();
  }

  showForm() {
    this.listRequisitions = this.items;
  }

  processAuthorizationForm(authorizationStatusId) {
    this.authorizationStatusId = authorizationStatusId;
    this.submittedRequisition = true;
    const authorizationSave: any = {};

    const requisitionsArray = [];
    this.listRequisitions.forEach(item => {
      requisitionsArray.push({
        id: item.id,
        valueId: item.valueId
      });
    });

    if (this.requisition.observation === '' && authorizationStatusId === AuthorizationStatus.Rejected) {
      return false;
    }

    authorizationSave.processTypeId = ProcessType.Requisition;
    authorizationSave.authorizationStatusId = authorizationStatusId;
    authorizationSave.detail = requisitionsArray;
    authorizationSave.observation = this.requisition.observation;
    authorizationSave.createBy = this.currentUser.userName;

    this.spinner.show();
    this.authorizationProcessService.updateAuthorizationProcess(authorizationSave).subscribe(
      data => {
        switch (authorizationStatusId) {
          case AuthorizationStatus.Authorized:
            this.alertMessageService.successMessage('Requisiciones Autorizadas correctamente.');
            break;
          case AuthorizationStatus.Rejected:
            this.alertMessageService.successMessage('Requisiciones Rechazadas correctamente.');
        }
        this.spinner.hide();
        this.saveItem.emit(true);
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
