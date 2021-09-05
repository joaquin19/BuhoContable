import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, AuthorizationStatus } from '@app/core/enums';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { ReconciliationAuthorizationDetailFormComponent } from '../reconciliation-authorization-detail-form/reconciliation-authorization-detail-form.component';

@Component({
  selector: 'app-reconciliation-authorization-detail-modal',
  templateUrl: './reconciliation-authorization-detail-modal.component.html',
  styleUrls: ['./reconciliation-authorization-detail-modal.component.scss']
})
export class ReconciliationAuthorizationDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() authorize = new EventEmitter();
  @Output() reject = new EventEmitter();

  @ViewChild('modalAuthorizationForm', { static: false })
  public modalAuthorizationForm: ModalAuthorizationFormComponent;
  @ViewChild('reconciliationAuthorizationDetailForm', { static: false })
  public reconciliationAuthorizationDetailForm: ReconciliationAuthorizationDetailFormComponent;
  public authorizationStatus = AuthorizationStatus;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  authorizeHandled() {
    this.reconciliationAuthorizationDetailForm.processAuthorizationForm(this.authorizationStatus.Authorized);
  }

  rejectHandled() {
    this.reconciliationAuthorizationDetailForm.processAuthorizationForm(this.authorizationStatus.Rejected);
  }

  saveFormHandled(event) {
    if (event) {
      this.modalAuthorizationForm.closeModalAuthorization();
    }
  }

}
