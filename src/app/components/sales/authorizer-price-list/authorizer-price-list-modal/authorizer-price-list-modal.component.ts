import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { AuthorizerPriceListFormComponent } from '../authorizer-price-list-form/authorizer-price-list-form.component';

@Component({
  selector: 'app-authorizer-price-list-modal',
  templateUrl: './authorizer-price-list-modal.component.html',
  styleUrls: ['./authorizer-price-list-modal.component.scss']
})
export class AuthorizerPriceListModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationPriceListForm', { static: false })
  public modalAuthorizationPriceListForm: ModalAuthorizationFormComponent;
  @ViewChild('authorizerPriceListForm', { static: false })
  public authorizerPriceListForm: AuthorizerPriceListFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.authorizerPriceListForm.priceListAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.authorizerPriceListForm.priceListAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationPriceListForm.closeModalAuthorization();
    }
  }

}
