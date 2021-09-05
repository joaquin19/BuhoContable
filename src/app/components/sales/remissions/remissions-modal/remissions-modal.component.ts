import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { RemissionsFormComponent } from '../remissions-form/remissions-form.component';

@Component({
  selector: 'app-remissions-modal',
  templateUrl: './remissions-modal.component.html',
  styleUrls: ['./remissions-modal.component.scss']
})
export class RemissionsModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('remissionsForm', { static: false })
  public remissionsForm: RemissionsFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    console.log('closeHandled');
  }

  saveHandled() {
    console.log('saveHandled');
    this.remissionsForm.saveForm();
  }

  saveFormHandled(event) {
    console.log('event: ', event);

    if (event) {
      this.modalForm.closeModal();
    }
  }

}
