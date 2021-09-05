import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Action } from '@app/core/enums';

@Component({
  selector: 'app-business-form-data',
  templateUrl: './business-form-data.component.html',
  styleUrls: ['./business-form-data.component.scss']
})
export class BusinessFormDataComponent implements OnInit {

  @Input() action: Action;
  @ViewChild('formBusinessData', { static: false })
  public formBusinessData: NgForm;
  public personalData: any;
  public submitted: boolean;

  constructor() {
    this.submitted = false;
    this.personalData = {
      id: 0,
      rfc: '',
      legalName: '',
      email: ''
    };
  }

  ngOnInit(): void {
  }

}
