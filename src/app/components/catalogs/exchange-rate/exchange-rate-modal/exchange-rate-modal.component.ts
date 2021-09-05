import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { ExchangeRateFormComponent } from '../exchange-rate-form/exchange-rate-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-exchange-rate-modal',
  templateUrl: './exchange-rate-modal.component.html',
  styleUrls: ['./exchange-rate-modal.component.scss']
})
export class ExchangeRateModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('exchangeRateForm', { static: false })
  public exchangeRateForm: ExchangeRateFormComponent;
  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    console.log('closeHandled');
  }

  saveHandled() {
    console.log('saveHandled');
    this.exchangeRateForm.saveForm();
  }

  saveFormHandled(event) {
    console.log('event: ', event);
    this.modalForm.closeModal(event);
  }

}
