import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, ProcessType } from '@app/core/enums';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';

@Component({
  selector: 'app-reconciliation-edition-modal',
  templateUrl: './reconciliation-edition-modal.component.html',
  styleUrls: ['./reconciliation-edition-modal.component.scss']
})
export class ReconciliationEditionModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalReconciliationEditionForm', { static: false })
  public modalReconciliationEditionForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
    this.processType = ProcessType.PurchaseOrder;
  }

  closeHandled() {
    this.modalReconciliationEditionForm.closeModal();
  }

}
