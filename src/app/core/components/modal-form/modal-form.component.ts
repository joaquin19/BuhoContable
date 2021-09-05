import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  @Input() title = '';
  @Output() closeForm = new EventEmitter();
  @Output() saveForm = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  closeModal(event = null) {
    this.closeForm.emit();
    this.activeModal.close(event);
  }

  saveModal() {
    this.saveForm.emit();
  }

}
