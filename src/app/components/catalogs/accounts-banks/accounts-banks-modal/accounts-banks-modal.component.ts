import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { AccountsBanksFormComponent } from '../accounts-banks-form/accounts-banks-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-accounts-banks-modal',
  templateUrl: './accounts-banks-modal.component.html',
  styleUrls: ['./accounts-banks-modal.component.scss']
})
export class AccountsBanksModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('accountsBanksForm', { static: false })
  public accountsBanksForm: AccountsBanksFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.accountsBanksForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
