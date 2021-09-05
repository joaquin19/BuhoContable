import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { SuppliersContactFormComponent } from '../suppliers-contact-form/suppliers-contact-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-suppliers-contact-modal',
  templateUrl: './suppliers-contact-modal.component.html',
  styleUrls: ['./suppliers-contact-modal.component.scss']
})
export class SuppliersContactModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('suppliersContactForm', { static: false })
  public suppliersContactForm: SuppliersContactFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.suppliersContactForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
