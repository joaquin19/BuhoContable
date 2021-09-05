import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { RequisitionsAuthorizerFormComponent } from '../requisitions-authorizer-form/requisitions-authorizer-form.component';

@Component({
  selector: 'app-requisitions-authorizer-modal',
  templateUrl: './requisitions-authorizer-modal.component.html',
  styleUrls: ['./requisitions-authorizer-modal.component.scss']
})
export class RequisitionsAuthorizerModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('requisitionsAuthorizerForm', { static: false })
  public requisitionsAuthorizerForm: RequisitionsAuthorizerFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.requisitionsAuthorizerForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.requisitionsAuthorizerForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
