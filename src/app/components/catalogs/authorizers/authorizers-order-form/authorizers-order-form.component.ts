import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AlertMessageService, AuthorizerService, SessionService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Action } from '@app/core/enums';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-authorizers-order-form',
  templateUrl: './authorizers-order-form.component.html',
  styleUrls: ['./authorizers-order-form.component.scss']
})
export class AuthorizersOrderFormComponent implements OnInit {

  @ViewChild('gridAuthorizers', { static: false })
  public gridAuthorizers: GridComponent;

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  public titleHeader: string;
  public listHeaders: any;
  public listAuthorizers: any;
  public cols: any;
  public pageRedirect: string;
  public currentUser: any;
  public selectOptions: any;
  public refresh: boolean;

  constructor(
    private alertMessageService: AlertMessageService,
    private authorizerService: AuthorizerService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.listAuthorizers = [];
    this.cols = [];
    this.selectOptions = { type: 'Single' };
    this.refresh = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'sortOrder', header: 'Orden', width: 50 },
      { field: 'id', header: 'Id', width: 0, visible: false },
      { field: 'userName', header: 'Usuario', width: 100 },
      { field: 'userSystemId', header: 'Usuario Id', width: 0, visible: false },
      { field: 'fullName', header: 'Nombre', width: 180 }
    ];

    this.showForm();
  }

  showForm() {
    this.getAuthorizerByProcessTypeId(this.item.processTypeId);
  }

  getAuthorizerByProcessTypeId(processTypeId) {
    this.spinner.show();
    this.authorizerService.getAuthorizerByProcessTypeId(processTypeId).subscribe(
      data => {
        this.listAuthorizers = data;
        this.listAuthorizers.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  saveForm() {
    const authorizerOrderSave: any = {};

    const authorizersArray = [];
    this.listAuthorizers.forEach(element => {
      authorizersArray.push({
        id: element.id,
        sortOrder: element.sortOrder
      });
    });

    authorizerOrderSave.authorizers = authorizersArray;
    authorizerOrderSave.createBy = this.currentUser.userName;

    this.spinner.show();
    this.authorizerService.updateAuthorizerOrder(authorizerOrderSave).subscribe(data => {
      this.alertMessageService.successMessage('Orden de Autorizadores editado correctamente.');
      this.saveItem.emit(true);
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  rowDrop(event) {
    this.refresh = true;
  }

  dataBound(event) {
    if (this.refresh) {
      let dataAuthorizers: any = [];
      dataAuthorizers = this.gridAuthorizers.dataSource;
      this.listAuthorizers = [];

      for (let index = 0; index < dataAuthorizers.length; index++) {
        const element = dataAuthorizers[index];
        element.sortOrder = (index + 1);
      }
      this.listAuthorizers = dataAuthorizers;

      this.gridAuthorizers.refresh();
      this.refresh = false;
    }
  }

}
