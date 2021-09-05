import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertMessageService, CurrencyService, BankService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-suppliers-financial-form',
  templateUrl: './suppliers-financial-form.component.html',
  styleUrls: ['./suppliers-financial-form.component.scss']
})
export class SuppliersFinancialFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formSupplierFinancial', { static: false })
  public formSupplierFinancial: NgForm;
  @ViewChild('bankObj', { static: false })
  public bankObj: DropDownListComponent;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;

  public supplierFinancial: any;
  public listCurrencies: any;
  public listBanks: any;
  public submitted: boolean;

  constructor(
    private alertMessageService: AlertMessageService,
    private currencyService: CurrencyService,
    private bankService: BankService,
    private spinner: NgxSpinnerService
  ) {
    this.supplierFinancial = {
      id: 0,
      account: '',
      clabe: '',
      bankId: null,
      bankName: '',
      currencyId: null,
      currencyName: ''
    };

    this.listCurrencies = [];
    this.listBanks = [];
    this.submitted = false;

  }

  ngOnInit(): void {
    this.getCurrencies();
    this.getBanks();
  }

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeCurrency() {
    const currencyText = this.currencyObj.text;
    if (currencyText !== null) {
      this.supplierFinancial.currencyName = currencyText;
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
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeBank() {
    const bankText = this.bankObj.text;
    if (bankText !== null) {
      this.supplierFinancial.bankName = bankText;
    }
  }

  filteringBank: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listBanks, query);
  }

  saveForm() {
    this.submitted = true;

    if (this.formSupplierFinancial.invalid) {
      return;
    }

    this.saveItem.emit(this.supplierFinancial);
  }

}
