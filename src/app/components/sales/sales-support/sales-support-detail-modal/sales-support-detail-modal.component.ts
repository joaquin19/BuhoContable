import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { Action } from '@app/core/enums';


@Component({
  selector: 'app-sales-support-detail-modal',
  templateUrl: './sales-support-detail-modal.component.html',
  styleUrls: ['./sales-support-detail-modal.component.scss']
})
export class SalesSupportDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();

  @ViewChild(' ', { static: false })
  public modalSaleSupportDetailForm: ModalDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    this.modalSaleSupportDetailForm.closeModal();
  }

}
