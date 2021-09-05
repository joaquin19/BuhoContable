import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, ProcessType } from '@app/core/enums';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';

@Component({
  selector: 'app-purchase-orders-detail-modal',
  templateUrl: './purchase-orders-detail-modal.component.html',
  styleUrls: ['./purchase-orders-detail-modal.component.scss']
})
export class PurchaseOrdersDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalPurchaseOrdersDetailForm', { static: false })
  public modalPurchaseOrdersDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
    this.processType = ProcessType.PurchaseOrder;
  }

  closeHandled() {
    this.modalPurchaseOrdersDetailForm.closeModal();
  }

}
