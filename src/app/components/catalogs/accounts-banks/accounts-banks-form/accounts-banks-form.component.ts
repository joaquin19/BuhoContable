import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@app/core/enums';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { AlertMessageService, BankService, CurrencyService, SessionService } from '@app/core/services';
import { AccountBankService } from '@app/core/services/account-bank.service';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import * as numeral from 'numeral';
import { AccountBankContactService } from '@app/core/services/account-bank-contact.service';

@Component({
  selector: 'app-accounts-banks-form',
  templateUrl: './accounts-banks-form.component.html',
  styleUrls: ['./accounts-banks-form.component.scss']
})
export class AccountsBanksFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formAccountBank', { static: false })
  public formAccountBank: NgForm;
  @ViewChild('bankObj', { static: false })
  public bankObj: DropDownListComponent;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;

  public mode: string;
  public filterPlaceholder: string;
  public submitted: boolean;
  public titleHeader: string;
  public listHeaders: any;
  public listBanks: any;
  public listCurrencies: any;
  public accountBank: any;
  public maxLengthDescription: number;
  public pageRedirect: string;
  public currentUser: any;
  public accountBankContact: any;
  public listAccountBankContact: any;
  public isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private bankService: BankService,
    private accountsBanksService: AccountBankService,
    private accountBankContactService: AccountBankContactService,
    private currencyService: CurrencyService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.maxLengthDescription = 200;
    this.submitted = false;
    this.titleHeader = '';
    this.listHeaders = [];
    this.listCurrencies = [];
    this.listBanks = [];
    this.listAccountBankContact = [];
    this.accountBank = {
      id: 0,
      name: '',
      description: '',
      bankId: null,
      branchOffice: null,
      currencyId: null,
      accountNumber: null,
      clabe: null,
      swiftCode: '',
      balance: null,
      checkNumber: null
    };
    this.accountBankContact = {
      id: 0,
      accountBankId: null,
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phone1: '',
      phone2: '',
      movil1: '',
      movil2: ''
    };
    this.isEdit = false;
  }

  ngOnInit(): void {
    this.filterPlaceholder = 'Buscar Impuestos';
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.accountBank = {
          id: 0,
          name: '',
          description: '',
          bankId: null,
          branchOffice: null,
          currencyId: null,
          accountNumber: null,
          clabe: null,
          swiftCode: '',
          balance: null,
          checkNumber: null
        };
        break;
      case Action.Edit:
        this.isEdit = true;
        console.log(this.item);
        this.accountBank = {
          id: this.item.id,
          name: this.item.name,
          description: this.item.description,
          bankId: this.item.bankId,
          branchOffice: this.item.branchOffice,
          currencyId: this.item.currencyId,
          accountNumber: this.item.accountNumber,
          clabe: this.item.clabe,
          swiftCode: this.item.swiftCode,
          balance: numeral(this.item.balance).format('$0,0.0000'),
          initialBalance: numeral(this.item.initialBalance).format('$0,0.0000'),
          checkNumber: this.item.checkNumber,
          inactive: this.item.inactive
        };
        this.getAccountBankcontacts();
        break;
    }

    this.getBanks();
    this.getCurrencies();
  }

  getAccountBankcontacts() {
    this.spinner.show();
    this.accountBankContactService.getAccountBankContactsByAccountBankId(this.accountBank.id).subscribe(
      data => {
        this.listAccountBankContact = data;
        if (this.listAccountBankContact.length > 0) {
          this.accountBankContact = this.listAccountBankContact[0];
        }
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getBanks() {
    this.spinner.show();
    this.bankService.getBanks().subscribe(
      data => {
        this.listBanks = data;
        this.bankObj.value = this.action === Action.Edit ? this.accountBank.bankId : 0;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringBank: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'id', e.text, true, true) : query;
    e.updateData(this.listBanks, query);
  }

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.currencyObj.value = this.action === Action.Edit ? this.accountBank.currencyId : 0;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  /*changeCurrency() {
    const currencyText = this.currencyObj.text;
    if (currencyText !== null) {
      this.supplierFinancial.currencyName = currencyText;
    }
  }*/

  filteringCurrencies: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'id', e.text, true, true) : query;
    e.updateData(this.listCurrencies, query);
  }

  blurUnitPrice(event) {
    const element = event.target;
    const valueUnitPrice = parseFloat(numeral(element.value).value());

    if (!isNaN(valueUnitPrice)) {
      this.itemCalculation(valueUnitPrice);
    }
  }

  itemCalculation(unitPrice) {
    this.accountBank.unitPrice = numeral(unitPrice).format('$0,0.0000');
  }

  saveForm() {

    this.submitted = true;

    if (this.formAccountBank.invalid) {
      return;
    }

    const accountBankSave: any = {};

    accountBankSave.id = this.accountBank.id;
    accountBankSave.name = this.accountBank.name.trim();
    accountBankSave.description = this.accountBank.description.trim();
    accountBankSave.bankId = this.accountBank.bankId;
    accountBankSave.currencyId = this.accountBank.currencyId;
    accountBankSave.branchOffice = this.accountBank.branchOffice;
    accountBankSave.accountNumber = this.accountBank.accountNumber;
    accountBankSave.clabe = this.accountBank.clabe;
    accountBankSave.swiftCode = this.accountBank.swiftCode;
    accountBankSave.initialBalance = numeral(this.accountBank.initialBalance).value();
    accountBankSave.checkNumber = this.accountBank.checkNumber;
    accountBankSave.createBy = this.currentUser.userName;
    accountBankSave.accountBankContact = [];

    accountBankSave.accountBankContact.push(this.accountBankContact);

    console.log(accountBankSave);

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.accountsBanksService.saveAccountBank(accountBankSave).subscribe(data => {
          this.alertMessageService.successMessage('Cuenta Bancaria guardado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.accountsBanksService.updateAccountBank(accountBankSave).subscribe(data => {
          this.alertMessageService.successMessage('Cuenta Bancaria editado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  blurInitialBalance(event) {
    const element = event.target;
    const valueInitialBalance = parseFloat(numeral(element.value).value());

    if (!isNaN(valueInitialBalance)) {
      this.accountBank.initialBalance = numeral(valueInitialBalance).format('$0,0.0000');
    } else {
      this.accountBank.initialBalance = '';
    }
  }

}
