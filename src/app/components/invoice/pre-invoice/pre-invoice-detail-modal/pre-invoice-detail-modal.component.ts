import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-pre-invoice-detail-modal',
  templateUrl: './pre-invoice-detail-modal.component.html',
  styleUrls: ['./pre-invoice-detail-modal.component.scss']
})
export class PreInvoiceDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalPreInvoiceDetailForm', { static: false })
  public modalPreInvoiceDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    this.modalPreInvoiceDetailForm.closeModal();
  }

}
