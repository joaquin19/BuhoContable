import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action, ProcessType } from '@app/core/enums';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';


@Component({
  selector: 'app-requisitions-detail-modal',
  templateUrl: './requisitions-detail-modal.component.html',
  styleUrls: ['./requisitions-detail-modal.component.scss']
})
export class RequisitionsDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() processType: any;

  @ViewChild('modalDetailForm', { static: false })
  public modalDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
    this.processType = ProcessType.Requisition;
  }

  closeHandled() {
    this.modalDetailForm.closeModal();
  }

}
