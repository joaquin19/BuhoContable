import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { Action } from '@app/core/enums';
import { CustomersFinancialFormComponent } from '../customers-financial-form/customers-financial-form.component';

@Component({
  selector: 'app-customers-financial-modal',
  templateUrl: './customers-financial-modal.component.html',
  styleUrls: ['./customers-financial-modal.component.scss']
})
export class CustomersFinancialModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('customersFinancialForm', { static: false })
  public customersFinancialForm: CustomersFinancialFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.customersFinancialForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
