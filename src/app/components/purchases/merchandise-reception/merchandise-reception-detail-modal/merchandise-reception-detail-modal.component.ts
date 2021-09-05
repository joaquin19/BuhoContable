import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { Action } from '@app/core/enums';
import { MerchandiseReceptionDetailFormComponent } from '../merchandise-reception-detail-form/merchandise-reception-detail-form.component';

@Component({
  selector: 'app-merchandise-reception-detail-modal',
  templateUrl: './merchandise-reception-detail-modal.component.html',
  styleUrls: ['./merchandise-reception-detail-modal.component.scss']
})
export class MerchandiseReceptionDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('merchandiseReceptionDetailForm', { static: false })
  public merchandiseReceptionEditionForm: MerchandiseReceptionDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

}
