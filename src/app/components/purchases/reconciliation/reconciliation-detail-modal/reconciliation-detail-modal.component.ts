import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, ProcessType } from '@app/core/enums';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';

@Component({
  selector: 'app-reconciliation-detail-modal',
  templateUrl: './reconciliation-detail-modal.component.html',
  styleUrls: ['./reconciliation-detail-modal.component.scss']
})
export class ReconciliationDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalReconciliationDetailForm', { static: false })
  public modalReconciliationDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
    this.processType = ProcessType.PurchaseOrder;
  }

  closeHandled() {
    this.modalReconciliationDetailForm.closeModal();
  }

}
