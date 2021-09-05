import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-authorization-form',
  templateUrl: './modal-authorization-form.component.html',
  styleUrls: ['./modal-authorization-form.component.scss']
})
export class ModalAuthorizationFormComponent implements OnInit {

  @Input() title = '';
  @Output() closeAuthorizationForm = new EventEmitter();
  @Output() authorizeModalAuthorizationForm = new EventEmitter();
  @Output() rejectModalAuthorizationForm = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  closeModalAuthorization(event = null) {
    this.closeAuthorizationForm.emit();
    this.activeModal.close(event);
  }

  authorizeModalAuthorization() {
    this.authorizeModalAuthorizationForm.emit();
  }

  rejectModalAuthorization() {
    this.rejectModalAuthorizationForm.emit();
  }

}
