import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { CustomersDetailFormComponent } from '../customers-detail-form/customers-detail-form.component';

@Component({
  selector: 'app-customers-detail-modal',
  templateUrl: './customers-detail-modal.component.html',
  styleUrls: ['./customers-detail-modal.component.scss']
})
export class CustomersDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;

  @ViewChild('modalDetailForm', { static: false })
  public modalDetailForm: ModalDetailFormComponent;
  @ViewChild('customersDetailForm', { static: false })
  public customersDetailForm: CustomersDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

}
