import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-balance-movements-detail-modal',
  templateUrl: './balance-movements-detail-modal.component.html',
  styleUrls: ['./balance-movements-detail-modal.component.scss']
})
export class BalanceMovementsDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();

  @ViewChild('modalBalanceMovementsDetailForm', { static: false })
  public modalBalanceMovementsDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    this.modalBalanceMovementsDetailForm.closeModal();
  }

}
