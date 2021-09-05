import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { AuthorizerPurchaseOrdersDetailFormComponent } from '../authorizer-purchase-orders-detail-form/authorizer-purchase-orders-detail-form.component';

@Component({
  selector: 'app-authorizer-purchase-orders-detail-modal',
  templateUrl: './authorizer-purchase-orders-detail-modal.component.html',
  styleUrls: ['./authorizer-purchase-orders-detail-modal.component.scss']
})
export class AuthorizerPurchaseOrdersDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('authorizerPurchaseOrdersDetailForm', { static: false })
  public authorizerPurchaseOrdersDetailForm: AuthorizerPurchaseOrdersDetailFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.authorizerPurchaseOrdersDetailForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.authorizerPurchaseOrdersDetailForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
