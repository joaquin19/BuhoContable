import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { AuthorizerPriceListDetailFormComponent } from '../authorizer-price-list-detail-form/authorizer-price-list-detail-form.component';

@Component({
  selector: 'app-authorizer-price-list-detail-modal',
  templateUrl: './authorizer-price-list-detail-modal.component.html',
  styleUrls: ['./authorizer-price-list-detail-modal.component.scss']
})
export class AuthorizerPriceListDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('authorizerPriceListDetailForm', { static: false })
  public authorizerPriceListDetailForm: AuthorizerPriceListDetailFormComponent;

  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.authorizerPriceListDetailForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.authorizerPriceListDetailForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
