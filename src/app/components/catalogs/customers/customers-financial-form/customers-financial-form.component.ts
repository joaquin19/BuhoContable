import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertMessageService, CurrencyService, BankService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerFinancialService } from '@app/core/services/customer-financial.service';

@Component({
  selector: 'app-customers-financial-form',
  templateUrl: './customers-financial-form.component.html',
  styleUrls: ['./customers-financial-form.component.scss']
})
export class CustomersFinancialFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formCustomerFinancial', { static: false })
  public formCustomerFinancial: NgForm;
  @ViewChild('bankObj', { static: false })
  public bankObj: DropDownListComponent;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;

  public customerFinancial: any;
  public listCurrencies: any;
  public listBanks: any;
  public submitted: boolean;
  public titleHeader: string;

  constructor(
    private alertMessageService: AlertMessageService,
    private currencyService: CurrencyService,
    private customerFinancialService: CustomerFinancialService,
    private bankService: BankService,
    private spinner: NgxSpinnerService
  ) {
    this.customerFinancial = {
      id: 0,
      account: '',
      clabe: null,
      bankId: null,
      bankName: '',
      currencyId: null,
      currencyName: ''
    };

    this.listCurrencies = [];
    this.listBanks = [];
    this.titleHeader = '';
    this.submitted = false;

  }

  ngOnInit(): void {
    this.showForm();
    this.getCurrencies();
    this.getBanks();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.titleHeader = 'Agregar Informacion Financiera';
        this.customerFinancial = {
          id: 0,
          account: '',
          clabe: null,
          bankId: null,
          bankName: '',
          currencyId: null,
          currencyName: '',
          swift: '',
          contactName: '',
          email: '',
          phone: ''
        };
        break;
      case Action.Edit:
        this.titleHeader = 'Editar Informacion Financiera';
        this.customerFinancial = {
          id: this.item.id,
          account: this.item.account,
          clabe: this.item.clabe,
          bankId: this.item.bankId,
          bankName: this.item.bankName,
          currencyId: this.item.currencyId,
          currencyName: this.item.currencyName,
          swift: this.item.swift,
          contactName: this.item.contactName,
          email: this.item.email,
          phone: this.item.phone
        };
        // this.getCustomerFinancialById(customerId)
        break;
    }
  }

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.currencyObj.value = this.action === Action.Edit ? this.customerFinancial.currencyId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getCustomerFinancialById(customerId) {
    this.spinner.show();
    this.customerFinancialService.getCustomerFinancialsByCustomerId(customerId).subscribe(
      data => {
        this.customerFinancial = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeCurrency() {
    const currencyText = this.currencyObj.text;
    if (currencyText !== null) {
      this.customerFinancial.currencyName = currencyText;
    }
  }

  filteringCurrency: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listCurrencies, query);
  }

  getBanks() {
    this.spinner.show();
    this.bankService.getBanks().subscribe(
      data => {
        this.listBanks = data;
        this.bankObj.value = this.action === Action.Edit ? this.customerFinancial.bankId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeBank() {
    const bankText = this.bankObj.text;
    if (bankText !== null) {
      this.customerFinancial.bankName = bankText;
    }
  }

  filteringBank: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listBanks, query);
  }

  saveForm() {
    this.submitted = true;

    if (this.formCustomerFinancial.invalid) {
      return;
    }

    this.saveItem.emit(this.customerFinancial);
  }

}

