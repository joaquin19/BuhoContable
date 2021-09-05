import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Action } from '@app/core/enums';
import { AlertMessageService, MerchandiseReceptionDetailService, SessionService } from '@app/core/services';
import { MerchandiseReceptionDocumentService } from '@app/core/services/merchandise-reception-document.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-merchandise-reception-edition-form',
  templateUrl: './merchandise-reception-edition-form.component.html',
  styleUrls: ['./merchandise-reception-edition-form.component.scss']
})
export class MerchandiseReceptionEditionFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formMerchandiseReceptionEdition', { static: false })
  public formMerchandiseReceptionEdition: NgForm;

  public submitted: boolean;
  public merchandiseReceptionEdition: any;
  public listCurrencies: any;
  public listBanks: any;
  public currentUser: any;
  public listImageNames: any;
  public merchandiseReceptionDocument: any;
  public fileUploadImageMerchandise: any;
  public typesFiles: string[];
  public files: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private merchandiseReceptionDetailService: MerchandiseReceptionDetailService,
    private merchandiseReceptionDocumentService: MerchandiseReceptionDocumentService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.merchandiseReceptionEdition = {
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
    this.submitted = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.merchandiseReceptionEdition = this.item;
    this.merchandiseReceptionEdition.newPendingQuantity = this.item.pendingQuantity;
    if (this.merchandiseReceptionEdition.merchandiseReceptionHeaderId !== 0) {
      this.getMerchandiseReceptionDetailByPOD();
    }
  }

  blurQuantity(event) {
    const element = event.target;
    const valueQuantity = parseInt(element.value, 0);

    if (!isNaN(valueQuantity)) {
      this.merchandiseReceptionEdition.newPendingQuantity = this.merchandiseReceptionEdition.pendingQuantity - valueQuantity;
      if (this.merchandiseReceptionEdition.newPendingQuantity < 0) {
        this.merchandiseReceptionEdition.newPendingQuantity = 0;
      }
    }
  }

  getMerchandiseReceptionDetailByPOD() {
    this.spinner.show();
    this.merchandiseReceptionDocumentService.getMerchandiseReceptionDocumentsByMRD(
      this.merchandiseReceptionEdition.merchandiseReceptionHeaderId,
      this.merchandiseReceptionEdition.id).subscribe(
        data => {
          this.merchandiseReceptionDocument = data;
          this.spinner.hide();
        },
        error => {
          this.alertMessageService.errorMessage(error.message);
        });
  }

  saveForm() {
    this.submitted = true;

    if (this.formMerchandiseReceptionEdition.invalid) {
      return;
    }

    if (this.files.length === 0) {
      this.alertMessageService.errorMessage('Favor de seleccionar al menos un archivo');
      return;
    }

    if (this.files.length > 5) {
      this.alertMessageService.errorMessage('Son cinco archivos máximo de evidencia');
      return;
    }

    const merchandiseReceptionSave: any = {};

    merchandiseReceptionSave.id = this.merchandiseReceptionEdition.id;
    merchandiseReceptionSave.merchandiseReceptionHeaderId = this.merchandiseReceptionEdition.merchandiseReceptionHeaderId;
    merchandiseReceptionSave.purchaseOrderHeaderId = this.merchandiseReceptionEdition.purchaseOrderHeaderId;
    merchandiseReceptionSave.articleId = this.merchandiseReceptionEdition.articleId;
    merchandiseReceptionSave.pendingQuantity = parseInt(this.merchandiseReceptionEdition.newPendingQuantity, 0);
    merchandiseReceptionSave.quantity = this.merchandiseReceptionEdition.quantity;
    merchandiseReceptionSave.receivedQuantity = parseInt(this.merchandiseReceptionEdition.newReceivedQuantity, 0);
    merchandiseReceptionSave.createBy = this.currentUser.userName;

    merchandiseReceptionSave.merchandiseReceptionDocument = [];

    this.files.forEach(item => {
      merchandiseReceptionSave.merchandiseReceptionDocument.push({
        id: item.id,
        userName: item.name,
        systemName: '',
        path: ''
      });
    });

    const formData = new FormData();

    this.files.forEach(item => {
      formData.append('files', item, item.name);
    });

    formData.append('merchandiseReceptionSave', JSON.stringify(merchandiseReceptionSave));

    this.spinner.show();
    this.merchandiseReceptionDetailService.saveMerchandiseReceptionDetail(formData).subscribe(data => {
      this.alertMessageService.successMessage('Mercancía recepcionada correctamente.');
      this.spinner.hide();
      this.saveItem.emit(true);
    }, error => {
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
