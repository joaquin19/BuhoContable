import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { Action } from '@app/core/enums';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { ProductsImportComponent } from '../products-import/products-import.component';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit {

  @Input() title: '';
  @Input() item: any;
  @Input() action: Action;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() changeImpoort = new EventEmitter<boolean>();

  @ViewChild('modalForm', { static: false })
  public modalForm: ModalFormComponent;
  @ViewChild('productsForm', { static: false })
  public productsForm: ProductsFormComponent;
  @ViewChild('productsImport', { static: false})
  public productsImport: ProductsImportComponent;
  public buttonImport: string;
  public changeToImport: boolean = false;

  constructor() {
    this.buttonImport = 'Import Excel';
  }

  ngOnInit(): void { }

  closeHandled() {}

  onClickImport() {
    this.changeToImport = !this.changeToImport;
  }

  saveHandled() {
    this.changeToImport
      ? this.productsImport.saveImportProducts()
      : this.productsForm.saveForm();
  }

  saveFormHandled(event) {
    this.modalForm.closeModal(event);
  }

  saveExportProducts(event) {
    this.modalForm.closeModal(event);
  }

}
