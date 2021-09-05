import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { RequisitionsAuthorizerDetailFormComponent } from '../requisitions-authorizer-detail-form/requisitions-authorizer-detail-form.component';

@Component({
  selector: 'app-requisitions-authorizer-detail-modal',
  templateUrl: './requisitions-authorizer-detail-modal.component.html',
  styleUrls: ['./requisitions-authorizer-detail-modal.component.scss']
})
export class RequisitionsAuthorizerDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('requisitionsAuthorizerDetailForm', { static: false })
  public requisitionsAuthorizerDetailForm: RequisitionsAuthorizerDetailFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.requisitionsAuthorizerDetailForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.requisitionsAuthorizerDetailForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
