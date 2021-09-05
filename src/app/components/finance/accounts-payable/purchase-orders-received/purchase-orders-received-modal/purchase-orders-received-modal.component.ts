import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';

@Component({
  selector: 'app-purchase-orders-received-modal',
  templateUrl: './purchase-orders-received-modal.component.html',
  styleUrls: ['./purchase-orders-received-modal.component.scss']
})
export class PurchaseOrdersReceivedModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    this.modalForm.closeModal();
  }

}
