import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { PurchaseOrdersEditionFormComponent } from '../purchase-orders-edition-form/purchase-orders-edition-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-purchase-orders-edition-modal',
  templateUrl: './purchase-orders-edition-modal.component.html',
  styleUrls: ['./purchase-orders-edition-modal.component.scss']
})
export class PurchaseOrdersEditionModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() listItemAdded: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('purchaseOrdersEditionForm', { static: false })
  public purchaseOrdersEditionForm: PurchaseOrdersEditionFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.purchaseOrdersEditionForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
