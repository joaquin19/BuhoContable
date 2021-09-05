import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MerchandiseReceptionEditionFormComponent } from '../merchandise-reception-edition-form/merchandise-reception-edition-form.component';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-merchandise-reception-edition-modal',
  templateUrl: './merchandise-reception-edition-modal.component.html',
  styleUrls: ['./merchandise-reception-edition-modal.component.scss']
})
export class MerchandiseReceptionEditionModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('merchandiseReceptionEditionForm', { static: false })
  public merchandiseReceptionEditionForm: MerchandiseReceptionEditionFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.merchandiseReceptionEditionForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
