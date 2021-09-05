import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { AlertMessageService, SessionService, UserSystemService, ProcessTypeService } from '@app/core/services';
import { AuthorizerService } from '@app/core/services/authorizer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-authorizers-form',
  templateUrl: './authorizers-form.component.html',
  styleUrls: ['./authorizers-form.component.scss']
})
export class AuthorizersFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formAutorizer', { static: false })
  public formAutorizer: NgForm;
  @ViewChild('processTypeObj', { static: false })
  public processTypeObj: DropDownListComponent;
  @ViewChild('userSystemObj', { static: false })
  public userSystemObj: DropDownListComponent;

  public titleHeader: string;
  public listHeaders: any;
  public listProcessTypes: any;
  public listUsersSystem: any;
  public authorizer: any;
  public maxLengthDescription: number;
  public pageRedirect: string;
  public currentUser: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private authorizerService: AuthorizerService,
    private processTypeService: ProcessTypeService,
    private userSystemService: UserSystemService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.listProcessTypes = [];
    this.listUsersSystem = [];
    this.authorizer = {
      id: 0,
      userSystemId: 0,
      userName: '',
      fullName: '',
      processTypeId: 0,
      processTypeName: '',
      sortOrder: 0,
      required: false,
    };
    this.maxLengthDescription = 200;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.authorizer = {
          id: 0,
          userSystemId: 0,
          userName: '',
          fullName: '',
          processTypeId: 0,
          processTypeName: '',
          sortOrder: 0,
          required: false,
        };
        break;
      case Action.Edit:
        this.authorizer = {
          id: this.item.id,
          userSystemId: this.item.userSystemId,
          userName: this.item.userName,
          fullName: this.item.fullName,
          processTypeId: this.item.processTypeId,
          processTypeName: this.item.processTypeName,
          sortOrder: this.item.sortOrder,
          required: this.item.required
        };
        break;
    }
    this.getUsersSystem();
    this.getProcessTypes();
  }

  getProcessTypes() {
    this.spinner.show();
    this.processTypeService.getProcessTypes().subscribe(
      data => {
        this.listProcessTypes = data;
        this.processTypeObj.value = this.action === Action.Edit ? this.authorizer.processTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });

  }

  filteringProcessTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listProcessTypes, query);
  }

  getUsersSystem() {
    this.spinner.show();
    this.userSystemService.getUsersSystem().subscribe(
      data => {
        this.listUsersSystem = data;
        this.userSystemObj.value = this.action === Action.Edit ? this.authorizer.userSystemId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringUsersSystem: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listUsersSystem, query);
  }

  saveForm() {
    const authorizerSave: any = {};

    authorizerSave.id = this.authorizer.id;
    authorizerSave.userSystemId = this.authorizer.userSystemId;
    authorizerSave.processTypeId = this.authorizer.processTypeId;
    authorizerSave.sortOrder = this.authorizer.sortOrder;
    authorizerSave.required = this.authorizer.required;
    authorizerSave.createBy = this.currentUser.userName;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.authorizerService.saveAuthorizer(authorizerSave).subscribe(data => {
          this.alertMessageService.successMessage('Autorizador guardado correctamente.');
          this.saveItem.emit(true);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.authorizerService.updateAuthorizer(authorizerSave).subscribe(data => {
          this.alertMessageService.successMessage('Autorizador editado correctamente.');
          this.saveItem.emit(true);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

}
