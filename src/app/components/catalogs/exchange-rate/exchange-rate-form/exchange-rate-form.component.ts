import { Component, ViewEncapsulation, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertMessageService, CurrencyService, SessionService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import * as numeral from 'numeral';
import { ExchangeRateService } from '@app/core/services/exchange-rate.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.scss']
})
export class ExchangeRateFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formExchangeRate', { static: false })
  public formExchangeRate: NgForm;
  @ViewChild('currencyObj', { static: false })
  public currencyObj: DropDownListComponent;

  public submitted: boolean;
  public titleHeader: string;
  public exchangeRate: any;
  public changeDay: NgbDateStruct;
  public currentUser: any;
  public listCurrencies: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private exchangeRateService: ExchangeRateService,
    private sessionService: SessionService,
    private currencyService: CurrencyService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
  ) {
    this.submitted = false;
    this.titleHeader = '';
    this.exchangeRate = {
      id: 0,
      currencyId: 0,
      exchangeRateValue: null,
      changeDay: ''
    };
    this.changeDay = this.calendar.getToday();
    this.listCurrencies = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
    this.getCurrencies();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.titleHeader = 'Agregar Tipo de Cambio';
        this.exchangeRate = {
          id: 0,
          exchangeRateValue: null,
          changeDay: ''
        };
        break;
      case Action.Edit:
        this.titleHeader = 'Editar Tipo de Cambio';
        this.exchangeRate = {
          id: this.item.id,
          exchangeRateValue: this.item.exchangeRateValue,
          changeDay: this.item.changeDay
        };
        if (this.exchangeRate.estimatedDate != null) {
          const [day, month, year] = this.exchangeRate.estimatedDate.split('-');
          const objDate = {
            day: parseInt(day, 0),
            month: parseInt(month, 0),
            year: parseInt(year, 0)
          };
          this.exchangeRate = objDate;
        }
        break;
    }
  }

  getCurrencies() {
    this.spinner.show();
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.listCurrencies = data;
        this.currencyObj.value = this.action === Action.Edit ? this.exchangeRate.currencyId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCurrencies: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listCurrencies, query);
  }

  saveForm() {
    this.submitted = true;

    if (this.formExchangeRate.invalid) {
      return;
    }
    const exchangeRateSave: any = {};

    exchangeRateSave.id = this.exchangeRate.id;
    exchangeRateSave.currencyId = this.exchangeRate.currencyId;
    exchangeRateSave.exchangeRateValue = numeral(this.exchangeRate.exchangeRateValue).value();
    exchangeRateSave.changeDay =
      moment(`${this.changeDay.year}-${this.changeDay.month}-${this.changeDay.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    exchangeRateSave.createBy = this.currentUser.userName;
    console.log('exchangeRateSave', exchangeRateSave);

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.exchangeRateService.saveExchangeRate(exchangeRateSave).subscribe(data => {
          this.alertMessageService.successMessage('Tipo de Cambio guardado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.exchangeRateService.updateExchangeRate(exchangeRateSave).subscribe(data => {
          this.alertMessageService.successMessage('Tipo de Cambio editado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

}
