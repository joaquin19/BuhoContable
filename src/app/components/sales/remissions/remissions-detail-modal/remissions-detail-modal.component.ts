import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { Action } from '@app/core/enums';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-remissions-detail-modal',
  templateUrl: './remissions-detail-modal.component.html',
  styleUrls: ['./remissions-detail-modal.component.scss']
})
export class RemissionsDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalRemissionsDetailForm', { static: false })
  public modalRemissionsDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    this.modalRemissionsDetailForm.closeModal();
  }

}
