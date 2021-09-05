import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { SuppliersDetailFormComponent } from '../suppliers-detail-form/suppliers-detail-form.component';

@Component({
  selector: 'app-suppliers-detail-modal',
  templateUrl: './suppliers-detail-modal.component.html',
  styleUrls: ['./suppliers-detail-modal.component.scss']
})
export class SuppliersDetailModalComponent implements OnInit {

  @Input() title: '';
  @Input() items: any;
  @Input() action: Action;

  @ViewChild('modalDetailForm', { static: false })
  public modalDetailForm: ModalDetailFormComponent;
  @ViewChild('suppliersDetailForm', { static: false })
  public suppliersDetailForm: SuppliersDetailFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

}
