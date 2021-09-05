import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertMessageService, ArticleService, TaxService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import * as numeral from 'numeral';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisitions-edition-form',
  templateUrl: './requisitions-edition-form.component.html',
  styleUrls: ['./requisitions-edition-form.component.scss']
})
export class RequisitionsEditionFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Input() listItemAdded: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formRequisitionEdition', { static: false })
  public formRequisitionEdition: NgForm;
  @ViewChild('articleObj', { static: false })
  public articleObj: DropDownListComponent;

  public requisitionEdition: any;
  public listArticles: any;
  public listTaxes: any;
  public listArticlesAdded: any;
  public submittedRequisitionEdition: boolean;
  public estimatedDate: NgbDateStruct;
  public maxLengthDescription: number;
  public isReadOnly: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private articleService: ArticleService,
    private taxService: TaxService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar
  ) {
    this.requisitionEdition = {
      id: 0,
      requisitionHeaderId: null,
      articleId: null,
      code: '',
      name: '',
      description: '',
      unitPrice: null,
      dimension: null,
      quantity: null,
      subTotal: null,
      total: null,
      estimatedDate: null
    };
    this.listTaxes = [];
    this.listArticlesAdded = [];
    this.isReadOnly = true;
    this.listArticles = [];
    this.submittedRequisitionEdition = false;
    this.maxLengthDescription = 200;
    this.estimatedDate = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.requisitionEdition = {
          id: 0,
          requisitionHeaderId: 0,
          articleId: null,
          code: '',
          name: '',
          description: '',
          unitPrice: null,
          dimension: null,
          quantity: null,
          subTotal: null,
          total: null,
          estimatedDate: null
        };
        break;
      case Action.Edit:
        this.requisitionEdition = {
          id: this.item.id,
          requisitionHeaderId: this.item.requisitionHeaderId,
          articleId: this.item.articleId,
          code: this.item.code,
          name: this.item.name,
          description: this.item.description,
          unitPrice: numeral(this.item.unitPrice).format('$0,0.0000'),
          dimension: this.item.dimension,
          quantity: this.item.quantity,
          subTotal: numeral(this.item.subTotal).format('$0,0.0000'),
          total: numeral(this.item.total).format('$0,0.0000'),
          estimatedDate: this.item.estimatedDate
        };
        this.getTaxesByArticleId(this.requisitionEdition.articleId);
        const [day, month, year] = this.requisitionEdition.estimatedDate.split('-');
        const objDate = {
          day: parseInt(day, 0),
          month: parseInt(month, 0),
          year: parseInt(year, 0)
        };
        this.estimatedDate = objDate;
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
      this.requisitionEdition.unitPrice = 0;
      this.requisitionEdition.subTotal = 0;
      this.requisitionEdition.total = 0;

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
        this.requisitionEdition.articleId = data.id;
        this.requisitionEdition.code = data.code;
        this.requisitionEdition.name = data.name;
        this.requisitionEdition.description = data.description;
        this.requisitionEdition.unitPrice = data.unitPrice;
        this.requisitionEdition.dimension = data.dimension;
        this.getTaxesByArticleId(this.requisitionEdition.articleId);
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
        this.itemCalculation(this.requisitionEdition.unitPrice, this.requisitionEdition.quantity);
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
      this.itemCalculation(this.requisitionEdition.unitPrice, valueQuantity);
      this.requisitionEdition.unitPrice = numeral(this.requisitionEdition.unitPrice).format('$0,0.0000');
    }
  }

  blurUnitPrice(event) {
    const element = event.target;
    const valueUnitPrice = parseFloat(numeral(element.value).value());

    if (!isNaN(valueUnitPrice)) {
      const quantity = this.requisitionEdition.quantity != null ? this.requisitionEdition.quantity : 0;
      this.requisitionEdition.quantity = quantity;
      this.itemCalculation(valueUnitPrice, this.requisitionEdition.quantity);
      this.requisitionEdition.unitPrice = numeral(valueUnitPrice).format('$0,0.0000');
    }
  }

  itemCalculation(unitPrice, quantity = 0) {
    this.requisitionEdition.subTotal = numeral(numeral(unitPrice).value() * quantity).format('$0,0.0000');

    if (this.listTaxes.length === 0) {
      this.requisitionEdition.total = numeral(numeral(unitPrice).value() * quantity).format('$0,0.0000');
    } else {
      let valueTotal = 0;
      this.listTaxes.forEach(element => {
        element.amount = (numeral(unitPrice).value() * element.valuePercentage) * quantity;
        valueTotal = valueTotal + element.amount;
      });
      valueTotal = valueTotal + ((numeral(unitPrice).value()) * quantity);
      this.requisitionEdition.total = numeral(valueTotal).format('$0,0.0000');
    }
  }

  saveForm() {
    this.submittedRequisitionEdition = true;

    if (this.formRequisitionEdition.invalid) {
      return;
    }

    if (parseInt(this.requisitionEdition.quantity, 0) < 1) {
      this.alertMessageService.warningMessage('La cantidad mínima es 1.');
      return;
    }

    const itemRequisitionSave: any = {};

    itemRequisitionSave.id = this.requisitionEdition.id;
    itemRequisitionSave.requisitionHeaderId = this.requisitionEdition.requisitionHeaderId;
    itemRequisitionSave.articleId = this.requisitionEdition.articleId;
    itemRequisitionSave.code = this.requisitionEdition.code;
    itemRequisitionSave.name = this.requisitionEdition.name;
    itemRequisitionSave.description = this.requisitionEdition.description;
    itemRequisitionSave.unitPrice = numeral(this.requisitionEdition.unitPrice).value();
    itemRequisitionSave.dimension = this.requisitionEdition.dimension;
    itemRequisitionSave.quantity = parseInt(this.requisitionEdition.quantity, 0);
    itemRequisitionSave.subTotal = numeral(this.requisitionEdition.subTotal).value();
    itemRequisitionSave.total = numeral(this.requisitionEdition.total).value();
    itemRequisitionSave.estimatedDate = moment(`${this.estimatedDate.day}-${this.estimatedDate.month}-${this.estimatedDate.year}`, 'DD-MM-YYYY').format('DD-MM-YYYY');
    itemRequisitionSave.fullName = this.articleObj.text.trim();
    itemRequisitionSave.taxes = this.listTaxes;

    this.saveItem.emit(itemRequisitionSave);
  }

}

