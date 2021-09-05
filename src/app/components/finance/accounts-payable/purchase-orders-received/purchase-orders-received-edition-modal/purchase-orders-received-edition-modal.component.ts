import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { PurchaseOrdersReceivedEditionFormComponent } from '../purchase-orders-received-edition-form/purchase-orders-received-edition-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-purchase-orders-received-edition-modal',
  templateUrl: './purchase-orders-received-edition-modal.component.html',
  styleUrls: ['./purchase-orders-received-edition-modal.component.scss']
})
export class PurchaseOrdersReceivedEditionModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() listItemAdded: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('purchaseOrdersReceivedEditionForm', { static: false })
  public purchaseOrdersReceivedEditionForm: PurchaseOrdersReceivedEditionFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.purchaseOrdersReceivedEditionForm.saveForm();
  }

  saveFormHandled(event) {
    if (event) {
      this.modalForm.closeModal();
    }
  }

}
