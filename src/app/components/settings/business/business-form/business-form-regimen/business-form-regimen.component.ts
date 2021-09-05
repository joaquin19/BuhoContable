import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-business-form-regimen',
  templateUrl: './business-form-regimen.component.html',
  styleUrls: ['./business-form-regimen.component.scss']
})
export class BusinessFormRegimenComponent implements OnInit {

  @Input() action: Action;
  @ViewChild('formBusinessRegimen', { static: false })
  public formBusinessRegimen: NgForm;
  @ViewChild('creditNoteObj', { static: false })
  public creditNoteObj: DropDownListComponent;
  @ViewChild('invoiceObj', { static: false })
  public invoiceObj: DropDownListComponent;
  public regimen: any;
  public submitted: boolean;
  public listCreditNotes: any;
  public listInvoice: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private spinner: NgxSpinnerService,
    // private creditNoteService: StateProvinceService,
    // private invoiceService: InvoiceService,
  ) {
    this.submitted = false;
    this.listCreditNotes = [];
    this.listInvoice = [];
    this.regimen = {
      id: 0,
      creditNoteId: null,
      invoiceId: null,
    };
  }

  ngOnInit(): void {
    this.getInvoice();
    this.getCreditNote();
  }

  getInvoice() {
    // this.spinner.show();
  }

  filteringInvoice: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listInvoice, query);
  }

  getCreditNote() {
    // this.spinner.show();
  }

  filteringCreditNote: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCreditNotes, query);
  }

}
