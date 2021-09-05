import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { AuthorizersFormComponent } from '../authorizers-form/authorizers-form.component';

@Component({
  selector: 'app-authorizers-modal',
  templateUrl: './authorizers-modal.component.html',
  styleUrls: ['./authorizers-modal.component.scss']
})
export class AuthorizersModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('authorizersForm', { static: false })
  public authorizersForm: AuthorizersFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.authorizersForm.saveForm();
  }

  saveFormHandled(event) {
    if (event) {
      this.modalForm.closeModal();
    }
  }

}
