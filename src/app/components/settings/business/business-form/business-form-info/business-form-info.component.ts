import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService } from '@app/core/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-business-form-info',
  templateUrl: './business-form-info.component.html',
  styleUrls: ['./business-form-info.component.scss']
})
export class BusinessFormInfoComponent implements OnInit {

  @Input() action: Action;
  @ViewChild('formBusinessAditionalInfo', { static: false })
  public formBusinessAditionalInfo: NgForm;
  @ViewChild('fileUploadInvoiceLogo', { static: false })
  public fileUploadInvoiceLogo: ElementRef;
  public aditionalInfo: any;
  public submitted: boolean;
  public invoiceLogoDocument: any;
  public typesFiles: string[];
  public files: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private spinner: NgxSpinnerService,
  ) {
    this.submitted = false;
    this.typesFiles = ['.jpg', '.gif', '.png'];
    this.files = [];
    this.aditionalInfo = {
      id: 0,
      comercialName: '',
      phone1: '',
      phone2: '',
      phone3: '',
      email: '',
      invoiceLogoId: 0,
      invoiceLogo: '',
      aditionalInfoRecordDocuments: []
    };
    this.invoiceLogoDocument = {
      id: 0,
      name: '',
      description: '',
      required: false,
      allowedExtensions: ''
    };
  }

  ngOnInit(): void {
  }

  invoiceLogoSelect(customerDocumentTypeId, event) {
    const file = event.target.files[0];

    const fileName = file.name;
    let fileExtension = fileName.substr(fileName.lastIndexOf('.'));
    fileExtension = fileExtension.toLowerCase();

    this.aditionalInfo.invoiceLogo = '';
    this.files = this.files.filter(o => o.customerDocumentTypeId !== customerDocumentTypeId);

    if (this.typesFiles.indexOf(fileExtension) === -1) {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
      this.fileUploadInvoiceLogo.nativeElement.value = '';
      return;
    }

    this.aditionalInfo.invoiceLogoId = parseInt(customerDocumentTypeId, 0);
    this.aditionalInfo.invoiceLogo = fileName;
    const fileItem = { customerDocumentTypeId, file };
    this.files.push(fileItem);
  }

}
