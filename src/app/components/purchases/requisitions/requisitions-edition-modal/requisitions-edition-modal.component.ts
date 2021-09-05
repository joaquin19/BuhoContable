import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { RequisitionsEditionFormComponent } from '../requisitions-edition-form/requisitions-edition-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-requisitions-edition-modal',
  templateUrl: './requisitions-edition-modal.component.html',
  styleUrls: ['./requisitions-edition-modal.component.scss']
})
export class RequisitionsEditionModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() listItemAdded: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('requisitionsEditionForm', { static: false })
  public requisitionsEditionForm: RequisitionsEditionFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.requisitionsEditionForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}
