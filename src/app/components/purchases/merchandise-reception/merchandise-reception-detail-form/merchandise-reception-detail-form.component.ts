import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { MerchandiseReceptionDocumentService } from '@app/core/services/merchandise-reception-document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-merchandise-reception-detail-form',
  templateUrl: './merchandise-reception-detail-form.component.html',
  styleUrls: ['./merchandise-reception-detail-form.component.scss']
})
export class MerchandiseReceptionDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formMerchandiseReceptionDetail', { static: false })
  public formMerchandiseReceptionDetail: NgForm;

  public merchandiseReceptionDetail: any;
  public listCurrencies: any;
  public listBanks: any;
  public submittedMerchandiseReceptionDetail: boolean;
  public currentUser: any;
  public listImageNames: any;
  public merchandiseReceptionDocument: any;
  public fileUploadImageMerchandise: any;
  public typesFiles: string[];
  public files: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private merchandiseReceptionDocumentService: MerchandiseReceptionDocumentService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.merchandiseReceptionDetail = {
      id: 0,
      merchandiseReceptionHeaderId: 0,
      purchaseOrderHeaderId: 0,
      articleId: 0,
      name: '',
      description: '',
      fullName: '',
      pendingQuantity: 0,
      newPendingQuantity: 0,
      quantity: 0,
      receivedQuantity: 0,
      newReceivedQuantity: 0,
      unitMeasureId: 0,
      unitMeasureName: '',
      unitPrice: 0
    };
    this.merchandiseReceptionDocument = [{
      id: 0,
      path: '',
      merchandiseReceptionHeaderId: 0,
      merchandiseReceptionDetailId: 0,
      systemName: '',
      userName: ''
    }];
    this.listImageNames = [];
    this.fileUploadImageMerchandise = [];
    this.typesFiles = ['.png', '.jpg', 'jpeg'];
    this.files = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.merchandiseReceptionDetail = this.item;
    this.merchandiseReceptionDetail.newPendingQuantity = this.item.pendingQuantity;
    if (this.merchandiseReceptionDetail.merchandiseReceptionHeaderId !== 0) {
      this.getMerchandiseReceptionDetailByPOD();
    }
  }

  blurQuantity(event) {
    const element = event.target;
    const valueQuantity = parseInt(element.value, 0);

    if (!isNaN(valueQuantity)) {
      this.merchandiseReceptionDetail.newPendingQuantity = this.merchandiseReceptionDetail.pendingQuantity - valueQuantity;
      if (this.merchandiseReceptionDetail.newPendingQuantity < 0) {
        this.merchandiseReceptionDetail.newPendingQuantity = 0;
      }
    }
  }

  getMerchandiseReceptionDetailByPOD() {
    this.spinner.show();
    this.merchandiseReceptionDocumentService.getMerchandiseReceptionDocumentsByMRD(
      this.merchandiseReceptionDetail.merchandiseReceptionHeaderId,
      this.merchandiseReceptionDetail.id).subscribe(
        data => {
          this.merchandiseReceptionDocument = data;
          this.spinner.hide();
        },
        error => {
          this.alertMessageService.errorMessage(error.message);
        });
  }

  downloadDocument(document) {
    this.spinner.show();
    console.log(document);
    this.merchandiseReceptionDocumentService.downloadMerchandiseReceptionDocument(document).subscribe(
      data => {
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, `${document.userName}`);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  imageMerchandiseSelect(event) {
    if (event.target.files.length > 5) {
      this.alertMessageService.errorMessage('message');
      return;
    }
    let fileExtension = '';

    for (const file of event.target.files) {
      fileExtension = (file.name.substr(file.name.lastIndexOf('.'))).toLowerCase();
      if (this.typesFiles.indexOf(fileExtension) === -1) {
        this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
        this.fileUploadImageMerchandise.nativeElement.value = '';
        return;
      }
    }

    this.listImageNames = [];
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);
      this.listImageNames[index] = event.target.files[index].name;
    }
  }
}
