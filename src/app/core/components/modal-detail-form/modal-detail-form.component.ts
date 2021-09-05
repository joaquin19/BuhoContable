import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detail-form',
  templateUrl: './modal-detail-form.component.html',
  styleUrls: ['./modal-detail-form.component.scss']
})
export class ModalDetailFormComponent implements OnInit {

  @Input() title = '';
  @Output() closeDetailForm = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  closeModal(event = null) {
    this.closeDetailForm.emit();
    this.activeModal.close(event);
  }

}
