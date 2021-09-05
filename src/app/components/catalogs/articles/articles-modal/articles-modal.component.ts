import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { ArticlesFormComponent } from '../articles-form/articles-form.component';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-articles-modal',
  templateUrl: './articles-modal.component.html',
  styleUrls: ['./articles-modal.component.scss']
})
export class ArticlesModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('articlesForm', { static: false })
  public articlesForm: ArticlesFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandled() {
  }

  saveHandled() {
    this.articlesForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

}