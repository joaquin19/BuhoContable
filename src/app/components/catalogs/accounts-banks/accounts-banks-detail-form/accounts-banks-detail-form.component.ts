import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { AlertMessageService } from '@app/core/services';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountBankContactService } from '@app/core/services/account-bank-contact.service';
import * as numeral from 'numeral';
import { AccountBankService } from '@app/core/services/account-bank.service';

@Component({
  selector: 'app-accounts-banks-detail-form',
  templateUrl: './accounts-banks-detail-form.component.html',
  styleUrls: ['./accounts-banks-detail-form.component.scss']
})
export class AccountsBanksDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

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
  public pageRedirect: string;
  public currentUser: any;
  public accountBankContact: any;
  public listAccountBankContact: any;
  public total: any;
  public maxLengthDescription: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private accountBankContactService: AccountBankContactService,
    private accountBankService: AccountBankService,
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
    this.total = 0;
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.None:
        console.log(this.item);
        this.accountBank = {
          id: this.item.id,
          name: this.item.name,
          description: this.item.description,
          bankId: this.item.bankId,
          bankName: this.item.bankName,
          branchOffice: this.item.branchOffice,
          currencyId: this.item.currencyId,
          currencyName: this.item.currencyName,
          accountNumber: this.item.accountNumber,
          clabe: this.item.clabe,
          swiftCode: this.item.swiftCode,
          balance: numeral(this.item.balance).format('$0,0.0000'),
          checkNumber: this.item.checkNumber
        };
        this.getAccountBankBalanceById();
        this.getAccountBankcontacts();
        break;
    }
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

  getAccountBankBalanceById() {
    this.spinner.show();
    this.accountBankService.getAccountBankBalanceById(this.accountBank.id).subscribe(
      data => {
        this.accountBank = data;
        numeral(this.accountBank.initialBalance).format('$0,0.0000');
        this.accountBank.total = numeral(this.accountBank.credit - this.accountBank.charge).format('$0,0.0000');
        this.accountBank.credit = numeral(this.accountBank.credit).format('$0,0.0000');
        this.accountBank.charge = numeral(this.accountBank.charge).format('$0,0.0000');
        this.accountBank.balance = numeral(this.accountBank.balance).format('$0,0.0000');
        this.accountBank.initialBalance = numeral(this.accountBank.initialBalance).format('$0,0.0000');
        //numeral(this.total).format('$0,0.0000');
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
