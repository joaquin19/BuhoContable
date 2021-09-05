import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { Action, ProcessType } from '@app/core/enums';

import { EventEmitter } from 'events';

@Component({
  selector: 'app-price-list-detail-modal',
  templateUrl: './price-list-detail-modal.component.html',
  styleUrls: ['./price-list-detail-modal.component.scss']
})
export class PriceListDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalPriceListDetailForm', { static: false })
  public modalPriceListDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
    this.processType = ProcessType.Prices;
  }

  closeHandled() {
    this.modalPriceListDetailForm.closeModal();
  }

}
