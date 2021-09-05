import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { AuthorizerPurchaseOrdersFormComponent } from '../authorizer-purchase-orders-form/authorizer-purchase-orders-form.component';

@Component({
  selector: 'app-authorizer-purchase-orders-modal',
  templateUrl: './authorizer-purchase-orders-modal.component.html',
  styleUrls: ['./authorizer-purchase-orders-modal.component.scss']
})
export class AuthorizerPurchaseOrdersModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('authorizerPurchaseOrdersForm', { static: false })
  public authorizerPurchaseOrdersForm: AuthorizerPurchaseOrdersFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.authorizerPurchaseOrdersForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.authorizerPurchaseOrdersForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
