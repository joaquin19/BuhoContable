import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, CityService, CountryService, StateProvinceService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-business-form-domicile',
  templateUrl: './business-form-domicile.component.html',
  styleUrls: ['./business-form-domicile.component.scss']
})
export class BusinessFormDomicileComponent implements OnInit {

  @Input() action: Action;
  @ViewChild('formBusinessDomicile', { static: false })
  public formBusinessDomicile: NgForm;
  @ViewChild('countryObj', { static: false })
  public countryObj: DropDownListComponent;
  @ViewChild('stateProvinceObj', { static: false })
  public stateProvinceObj: DropDownListComponent;
  @ViewChild('cityObj', { static: false })
  public cityObj: DropDownListComponent;
  public domicile: any;
  public submitted: boolean;
  public listCountries: any;
  public listStatesProvinces: any;
  public listCities: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private spinner: NgxSpinnerService,
    private countryService: CountryService,
    private stateProvinceService: StateProvinceService,
    private cityService: CityService,
  ) {
    this.submitted = false;
    this.listCountries = [];
    this.listStatesProvinces = [];
    this.listCities = [];
    this.domicile = {
      id: 0,
      street: '',
      zipCode: '',
      neighborhoodName: '',
      countryId: null,
      stateProvinceId: null,
      cityId: null,
    };
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.spinner.show();
    this.countryService.getCountries().subscribe(
      data => {
        this.listCountries = data;
        this.countryObj.value = this.action === Action.Edit ? this.domicile.countryId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeCountry() {
    this.listStatesProvinces = [];
    const countryValue = this.countryObj.value;
    if (countryValue !== null) {
      this.getStatesProvinces(countryValue);
    }
  }

  filteringCountry: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCountries, query);
  }

  getStatesProvinces(countryId) {
    this.spinner.show();
    this.stateProvinceService.getStatesProvinces(countryId).subscribe(
      data => {
        this.listStatesProvinces = data;
        this.stateProvinceObj.value = this.action === Action.Edit ? this.domicile.stateProvinceId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  changeStatesProvinces() {
    this.listCities = [];
    const stateValue = this.stateProvinceObj.value;
    if (stateValue !== null) {
      this.getCities(stateValue);
    }
  }

  filteringStatesProvinces: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listStatesProvinces, query);
  }

  getCities(stateId) {
    this.spinner.show();
    this.cityService.getCities(stateId).subscribe(
      data => {
        this.listCities = data;
        this.cityObj.value = this.action === Action.Edit ? this.domicile.cityId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCities: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCities, query);
  }

}
