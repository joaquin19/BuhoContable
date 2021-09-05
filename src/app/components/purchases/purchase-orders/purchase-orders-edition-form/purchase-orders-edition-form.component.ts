import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertMessageService, ArticleService, TaxService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import * as numeral from 'numeral';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-orders-edition-form',
  templateUrl: './purchase-orders-edition-form.component.html',
  styleUrls: ['./purchase-orders-edition-form.component.scss']
})
export class PurchaseOrdersEditionFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Input() listItemAdded: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formPurchaseOrderEdition', { static: false })
  public formPurchaseOrderEdition: NgForm;
  @ViewChild('articleObj', { static: false })
  public articleObj: DropDownListComponent;

  public purchaseOrderEdition: any;
  public listArticlesAdded: any;
  public listTaxes: any;
  public listArticles: any;
  public submittedPurchaseOrderEdition: boolean;
  public modelDate: NgbDateStruct;
  public maxLengthDescription: number;
  public flag: any;
  public deleteItme: any;
  public isReadOnly: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private articleService: ArticleService,
    private taxService: TaxService,
    private spinner: NgxSpinnerService
  ) {
    this.listArticlesAdded = [];
    this.purchaseOrderEdition = {
      id: 0,
      purchaseOrderHeaderId: null,
      unitMeasureId: null,
      articleId: null,
      code: '',
      name: '',
      description: '',
      unitPrice: null,
      dimension: null,
      quantity: null,
      subTotal: null,
      total: null
    };
    this.listTaxes = [];
    this.flag = false;
    this.deleteItme = false;
    this.listArticles = [];
    this.isReadOnly = true;
    this.submittedPurchaseOrderEdition = false;
    this.maxLengthDescription = 200;
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.purchaseOrderEdition = {
          id: 0,
          purchaseOrderHeaderId: null,
          unitMeasureId: null,
          articleId: null,
          code: '',
          name: '',
          description: '',
          unitPrice: null,
          dimension: null,
          quantity: null,
          subTotal: null,
          total: null
        };
        break;
      case Action.Edit:
        this.purchaseOrderEdition = {
          id: this.item.id,
          purchaseOrderHeaderId: this.item.purchaseOrderHeaderId,
          unitMeasureId: this.item.unitMeasureId,
          unitMeasureName: this.item.unitMeasureName,
          articleId: this.item.articleId,
          code: this.item.code,
          name: this.item.name,
          description: this.item.description,
          unitPrice: numeral(this.item.unitPrice).format('$0,0.0000'),
          dimension: this.item.dimension,
          quantity: this.item.quantity,
          subTotal: numeral(this.item.subTotal).format('$0,0.0000'),
          total: numeral(this.item.total).format('$0,0.0000')
        };
        this.getTaxesByArticleId(this.purchaseOrderEdition.articleId);
        break;
    }
    console.log(this.listItemAdded);
    this.listArticlesAdded = this.listItemAdded;

    this.getArticles();
  }

  getArticles() {
    this.spinner.show();
    this.articleService.getArticles().subscribe(
      data => {
        if (this.action === Action.Create) {
          console.log(this.listArticlesAdded);
          this.listArticles = data.filter(({ id }) => !this.listArticlesAdded.some(exclude => exclude.articleId === id));
          this.isReadOnly = false;
        } else {
          this.listArticles = data;
        }
        this.articleObj.value = this.action === Action.Edit ? this.item.articleId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringArticles: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('fullName', 'contains', e.text, true, true) : query;
    e.updateData(this.listArticles, query);
  }

  changeArticle() {
    if (this.action === Action.Create) {
      this.purchaseOrderEdition.unitPrice = 0;
      this.purchaseOrderEdition.subTotal = 0;
      this.purchaseOrderEdition.total = 0;

      const articleValue = this.articleObj.value;
      if (articleValue !== null) {
        this.getArticleById(articleValue);
      }
    }
  }

  getArticleById(articleId) {
    this.spinner.show();
    this.articleService.getArticleById(articleId).subscribe(
      data => {
        this.purchaseOrderEdition.unitMeasureId = data.unitMeasureId;
        this.purchaseOrderEdition.unitMeasureName = data.unitMeasureName;
        this.purchaseOrderEdition.articleId = data.id;
        this.purchaseOrderEdition.code = data.code;
        this.purchaseOrderEdition.name = data.name;
        this.purchaseOrderEdition.description = data.description;
        this.purchaseOrderEdition.unitPrice = data.unitPrice;
        this.purchaseOrderEdition.dimension = data.dimension;
        this.getTaxesByArticleId(this.purchaseOrderEdition.articleId);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getTaxesByArticleId(articleId) {
    this.spinner.show();
    this.taxService.getTaxesByArticleId(articleId).subscribe(
      data => {
        this.listTaxes = data;
        this.itemCalculation(this.purchaseOrderEdition.unitPrice, this.purchaseOrderEdition.quantity);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  blurQuantity(event) {
    const element = event.target;
    const valueQuantity = parseInt(element.value, 0);

    if (!isNaN(valueQuantity)) {
      this.itemCalculation(this.purchaseOrderEdition.unitPrice, valueQuantity);
      this.purchaseOrderEdition.unitPrice = numeral(this.purchaseOrderEdition.unitPrice).format('$0,0.0000');
    }
  }

  blurUnitPrice(event) {
    const element = event.target;
    const valueUnitPrice = parseFloat(numeral(element.value).value());

    if (!isNaN(valueUnitPrice)) {
      const quantity = this.purchaseOrderEdition.quantity != null ? this.purchaseOrderEdition.quantity : 0;
      this.purchaseOrderEdition.quantity = quantity;
      this.itemCalculation(valueUnitPrice, quantity);
      this.purchaseOrderEdition.unitPrice = numeral(valueUnitPrice).format('$0,0.0000');
    }
  }

  itemCalculation(unitPrice, quantity = 0) {
    this.purchaseOrderEdition.subTotal = numeral(numeral(unitPrice).value() * quantity).format('$0,0.0000');

    if (this.listTaxes.length === 0) {
      this.purchaseOrderEdition.total = numeral(numeral(unitPrice).value() * quantity).format('$0,0.0000');
    } else {
      let valueTotal = 0;
      this.listTaxes.forEach(element => {
        element.amount = (numeral(unitPrice).value() * element.valuePercentage) * quantity;
        valueTotal = valueTotal + element.amount;
      });
      valueTotal = valueTotal + ((numeral(unitPrice).value()) * quantity);
      this.purchaseOrderEdition.total = numeral(valueTotal).format('$0,0.0000');
    }
  }

  saveForm() {
    this.submittedPurchaseOrderEdition = true;

    if (this.formPurchaseOrderEdition.invalid) {
      return;
    }

    if (parseInt(this.purchaseOrderEdition.quantity, 0) < 1) {
      this.alertMessageService.warningMessage('La cantidad mínima es 1.');
      return;
    }

    const itemPurchaseOrderSave: any = {};

    itemPurchaseOrderSave.id = this.purchaseOrderEdition.id;
    itemPurchaseOrderSave.purchaseOrderHeaderId = this.purchaseOrderEdition.purchaseOrderHeaderId;
    itemPurchaseOrderSave.articleId = this.purchaseOrderEdition.articleId;
    itemPurchaseOrderSave.code = this.purchaseOrderEdition.code;
    itemPurchaseOrderSave.name = this.purchaseOrderEdition.name;
    itemPurchaseOrderSave.description = this.purchaseOrderEdition.description;
    itemPurchaseOrderSave.unitMeasureId = this.purchaseOrderEdition.unitMeasureId;
    itemPurchaseOrderSave.unitPrice = numeral(this.purchaseOrderEdition.unitPrice).value();
    itemPurchaseOrderSave.dimension = this.purchaseOrderEdition.dimension;
    itemPurchaseOrderSave.quantity = parseInt(this.purchaseOrderEdition.quantity, 0);
    itemPurchaseOrderSave.subTotal = numeral(this.purchaseOrderEdition.subTotal).value();
    itemPurchaseOrderSave.total = numeral(this.purchaseOrderEdition.total).value();
    itemPurchaseOrderSave.fullName = this.articleObj.text;
    itemPurchaseOrderSave.deleteItme = this.deleteItme;
    itemPurchaseOrderSave.taxes = this.listTaxes;

    this.saveItem.emit(itemPurchaseOrderSave);

  }

  confirmRepleaceItem(item, itemAdded) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea sustituir el artículo <strong>${itemAdded.articleName}</strong> con cantidad <strong>${itemAdded.quantity}</strong>, por el artículo <strong>${item.articleName}</strong> con cantidad <strong>${item.quantity}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.flag = true;
        this.deleteItme = true;
        this.saveForm();
      }
    });
  }

}
