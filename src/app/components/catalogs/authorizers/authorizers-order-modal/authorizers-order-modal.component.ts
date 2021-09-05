import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { AuthorizersOrderFormComponent } from '../authorizers-order-form/authorizers-order-form.component';

@Component({
  selector: 'app-authorizers-order-modal',
  templateUrl: './authorizers-order-modal.component.html',
  styleUrls: ['./authorizers-order-modal.component.scss']
})
export class AuthorizersOrderModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalOrderForm', { static: false })
  public modalOrderForm: ModalFormComponent;
  @ViewChild('authorizersOrderForm', { static: false })
  public authorizersOrderForm: AuthorizersOrderFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.authorizersOrderForm.saveForm();
  }

  saveFormHandled(event) {
    if (event) {
      this.modalOrderForm.closeModal();
    }
  }

}
