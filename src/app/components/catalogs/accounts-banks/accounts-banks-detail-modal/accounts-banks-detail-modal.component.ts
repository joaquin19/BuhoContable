import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-accounts-banks-detail-modal',
  templateUrl: './accounts-banks-detail-modal.component.html',
  styleUrls: ['./accounts-banks-detail-modal.component.scss']
})
export class AccountsBanksDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalAccountBanksDetailForm', { static: false })
  public modalAccountBanksDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {

  }

  closeHandled() {
    this.modalAccountBanksDetailForm.closeModal();
  }

}
