import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertMessageService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-suppliers-contact-form',
  templateUrl: './suppliers-contact-form.component.html',
  styleUrls: ['./suppliers-contact-form.component.scss']
})
export class SuppliersContactFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formSupplierContact', { static: false })
  public formSupplierContact: NgForm;

  public supplierContact: any;
  public submitted: boolean;
  public titleHeader: string;

  constructor(
    private alertMessageService: AlertMessageService,
    private spinner: NgxSpinnerService
  ) {
    this.supplierContact = {
      id: 0,
      firstName: '',
      lastName: '',
      fullName: '',
      phone1: '',
      phone2: '',
      movil1: '',
      movil2: '',
      email: ''
    };

    this.submitted = false;
    this.titleHeader = '';
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.titleHeader = 'Agregar Contacto';
        this.supplierContact = {
          id: 0,
          firstName: '',
          lastName: '',
          fullName: null,
          phone1: '',
          phone2: null,
          movil1: '',
          movil2: '',
          email: ''
        };
        break;
      case Action.Edit:
        this.titleHeader = 'Editar Contacto';
        this.supplierContact = {
          id: this.item.id,
          firstName: this.item.firstName,
          lastName: this.item.lastName,
          fullName: this.item.fullName,
          phone1: this.item.phone1,
          phone2: this.item.phone2,
          movil1: this.item.movil1,
          movil2: this.item.movil2,
          email: this.item.email
        };
        break;
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formSupplierContact.invalid) {
      return;
    }

    this.supplierContact.fullName = `${this.supplierContact.firstName.trim()} ${this.supplierContact.lastName.trim()}`;
    this.saveItem.emit(this.supplierContact);
  }

}
