import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit {

  public titleHeader: string;
  public business: any;
  public action: Action;
  public submitted: boolean;
  public pageRedirect: string;
  public active: number;


  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private spinner: NgxSpinnerService,
  ) {
    this.titleHeader = '';
    this.business = {};
    this.active = 1;
    this.submitted = false;
    this.pageRedirect = '/settings/business';
   }

  ngOnInit(): void {
    this.showForm();
  }

  redirectToDigitalStamp() {
    const url = 'http://www.grupovitek.com/';
    window.open(url.toString(), '_blank');
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addBusiness':
            this.titleHeader = 'Nueva Empresa';
            this.business = {
              id: 0,
              priceTypeId: 1,
              customerId: null,
              projectId: null,
              currencyId: null,
              name: '',
              startDate: '',
              endDate: '',
              notes: '',
              createBy: '',
              createdOn: ''
            };
            this.action = Action.Create;
            break;
          case 'editBusiness':
            this.titleHeader = 'Edición de Empresa';
            this.business = {
              id: 0,
              priceTypeId: 1,
              customerId: null,
              projectId: null,
              currencyId: null,
              name: '',
              startDate: '',
              endDate: '',
              notes: '',
              createBy: '',
              createdOn: ''
            };
            this.action = Action.Edit;
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
  }

  saveForm() {
    this.submitted = true;
  }

}
