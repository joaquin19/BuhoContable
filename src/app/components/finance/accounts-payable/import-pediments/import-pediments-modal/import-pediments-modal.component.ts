import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';

@Component({
  selector: 'app-import-pediments-modal',
  templateUrl: './import-pediments-modal.component.html',
  styleUrls: ['./import-pediments-modal.component.scss']
})
export class ImportPedimentsModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    console.log('closeHandled');
  }

  saveHandled() {
    console.log('saveHandled');
    // this.purchaseOrdersReceivedForm.saveForm();
  }

  saveFormHandled(event) {
    console.log('event: ', event);

    if (event) {
      this.modalForm.closeModal();
    }
  }

}
