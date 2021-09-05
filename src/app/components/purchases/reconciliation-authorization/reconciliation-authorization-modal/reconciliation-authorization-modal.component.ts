import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { ReconciliationAuthorizationFormComponent } from '../reconciliation-authorization-form/reconciliation-authorization-form.component';

@Component({
  selector: 'app-reconciliation-authorization-modal',
  templateUrl: './reconciliation-authorization-modal.component.html',
  styleUrls: ['./reconciliation-authorization-modal.component.scss']
})
export class ReconciliationAuthorizationModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('reconciliationAuthorizationForm', { static: false })
  public reconciliationAuthorizationForm: ReconciliationAuthorizationFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.reconciliationAuthorizationForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.reconciliationAuthorizationForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
