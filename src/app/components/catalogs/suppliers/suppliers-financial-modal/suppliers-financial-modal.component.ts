import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { SuppliersFinancialFormComponent } from '../suppliers-financial-form/suppliers-financial-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-suppliers-financial-modal',
  templateUrl: './suppliers-financial-modal.component.html',
  styleUrls: ['./suppliers-financial-modal.component.scss']
})
export class SuppliersFinancialModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('suppliersFinancialForm', { static: false })
  public suppliersFinancialForm: SuppliersFinancialFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.suppliersFinancialForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
