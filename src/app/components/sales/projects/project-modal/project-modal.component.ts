import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Action } from '@app/core/enums';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('projectForm', { static: false })
  public projectForm: ProjectFormComponent;
  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
    console.log('closeHandled');
  }

  saveHandled() {
    console.log('saveHandled');
    this.projectForm.saveForm();
  }

  saveFormHandled(event) {
    console.log('event: ', event);
    this.modalForm.closeModal(event);
  }

}
