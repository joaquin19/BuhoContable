import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { CustomersContactFormComponent } from '../customers-contact-form/customers-contact-form.component';
import { Action } from '@app/core/enums';


@Component({
  selector: 'app-customers-contact-modal',
  templateUrl: './customers-contact-modal.component.html',
  styleUrls: ['./customers-contact-modal.component.scss']
})
export class CustomersContactModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('customersContactForm', { static: false })
  public customersContactForm: CustomersContactFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.customersContactForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
