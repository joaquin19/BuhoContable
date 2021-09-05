import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { Action } from '@app/core/enums';
import { SalesSupportFormComponent } from '../sales-support-form/sales-support-form.component';

@Component({
  selector: 'app-sales-support-modal',
  templateUrl: './sales-support-modal.component.html',
  styleUrls: ['./sales-support-modal.component.scss']
})
export class SalesSupportModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('remissionsForm', { static: false })
  public salesSupportForm: SalesSupportFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    console.log('closeHandled');
  }

  saveHandled() {
    console.log('saveHandled');
    this.salesSupportForm.saveForm();
  }

  saveFormHandled(event) {
    console.log('event: ', event);

    if (event) {
      this.modalForm.closeModal();
    }
  }
}
