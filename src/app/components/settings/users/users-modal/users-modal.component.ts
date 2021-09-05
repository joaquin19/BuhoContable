import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { UsersFormComponent } from '../users-form/users-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {

  @Input() title: '';
  @Input() action: Action;
  @Input() item: any;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('usersForm', { static: false })
  public usersForm: UsersFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.usersForm.saveForm();
  }

  saveFormHandled(event) {
    if (event) {
      this.modalForm.closeModal();
    }
  }

}
