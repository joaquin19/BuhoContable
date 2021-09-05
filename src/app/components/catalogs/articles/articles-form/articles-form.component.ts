import { Component, ViewEncapsulation, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertMessageService, ArticleService, SessionService, TaxService } from '@app/core/services';
import { ArticleTypeService } from '@app/core/services/article-type.service';
import { UnitMeasureService } from '@app/core/services/unit-measure.service';
import { Action } from '@app/core/enums';
import { NgxSpinnerService } from 'ngx-spinner';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelectionService, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import * as numeral from 'numeral';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CheckBoxSelectionService]
})
export class ArticlesFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formArticle', { static: false })
  public formArticle: NgForm;
  @ViewChild('articleTypeObj', { static: false })
  public articleTypeObj: DropDownListComponent;
  @ViewChild('unitsMeasureObj', { static: false })
  public unitsMeasureObj: DropDownListComponent;
  @ViewChild('taxesObj')
  public taxesObj: MultiSelectComponent;
  @ViewChild('selectall')
  public checkboxObj: CheckBoxComponent;
  @ViewChild('dropdown')
  public dropdownObj: CheckBoxComponent;
  @ViewChild('select')
  public reorderObj: CheckBoxComponent;

  public mode: string;
  public filterPlaceholder: string;
  public submitted: boolean;
  public titleHeader: string;
  public listHeaders: any;
  public listArticleTypes: any;
  public listUnitsMeasure: any;
  public taxesData: any;
  public article: any;
  public maxLengthDescription: number;
  public pageRedirect: string;
  public currentUser: any;
  public tax: string[];

  /**** MultiSelect DropDown****/
  // map the groupBy field with category column
  public taxes: object = { text: 'description', value: 'id' };
  // set the placeholder to the MultiSelect input
  public checkWaterMark: string;
  // set the MultiSelect popup height
  public popHeight: string;
  public selectedItems: any;
  // public value: string[];
  /**** MultiSelect DropDown fin****/

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private articleService: ArticleService,
    private articleTypeService: ArticleTypeService,
    private unitMeasureService: UnitMeasureService,
    private taxService: TaxService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.submitted = false;
    this.titleHeader = '';
    this.listHeaders = [];
    this.listArticleTypes = [];
    this.listUnitsMeasure = [];
    this.article = {
      id: 0,
      name: '',
      description: '',
      articleTypeId: null,
      articleTypeName: '',
      unitMeasureId: null,
      unitMeasureName: '',
      code: '',
      unitPrice: null,
      dimension: null,
      tax: {}
    };
    this.maxLengthDescription = 200;
    this.taxesData = {
      id: null,
      name: ''
    };

    this.mode = 'CheckBox';
    this.checkWaterMark = 'Seleccione';
    this.popHeight = '350px';
  }

  ngOnInit(): void {
    this.mode = 'CheckBox';
    this.filterPlaceholder = 'Buscar Impuestos';
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.titleHeader = 'Agregar Artículo';
        this.article = {
          id: 0,
          name: '',
          description: '',
          articleTypeId: null,
          articleTypeName: '',
          unitMeasureId: null,
          unitMeasureName: '',
          code: '',
          unitPrice: null,
          dimension: null
        };
        break;
      case Action.Edit:
        this.titleHeader = 'Editar Artículo';
        this.article = {
          id: this.item.id,
          name: this.item.name,
          description: this.item.description,
          articleTypeId: this.item.articleTypeId,
          unitMeasureId: this.item.unitMeasureId,
          code: this.item.code,
          unitPrice: numeral(this.item.unitPrice).format('$0,0.0000'),
          dimension: this.item.dimension
        };
        break;
    }

    this.getArticleTypes();
    this.getUnitsMeasure();
    this.getTaxes();
  }

  getArticleTypes() {
    this.spinner.show();
    this.articleTypeService.getArticleTypes().subscribe(
      data => {
        this.listArticleTypes = data;
        this.articleTypeObj.value = this.action === Action.Edit ? this.article.articleTypeId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringArticleTypes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'id', e.text, true, true) : query;
    e.updateData(this.listArticleTypes, query);
  }

  getUnitsMeasure() {
    this.spinner.show();
    this.unitMeasureService.getUnitsMeasure().subscribe(
      data => {
        this.listUnitsMeasure = data;
        if (this.action === Action.Create) {
          this.article.unitMeasureId = this.listUnitsMeasure[1].id;
        }
        this.unitsMeasureObj.value = (this.action === Action.Edit ? this.article.unitMeasureId : null);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringUnitsMeasure: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'id', e.text, true, true) : query;
    e.updateData(this.listUnitsMeasure, query);
  }

  getTaxes() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      data => {
        this.taxesData = data;
        // this.taxesObj.value = null; // = this.action === Action.Edit ? this.article.tax : null;
        this.spinner.hide();
        this.getTaxesByArticleId(this.article.id);
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringTaxes: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('description', 'id', e.text, true, true) : query;
    e.updateData(this.taxesData, query);
  }

  getTaxesByArticleId(articleId) {
    this.spinner.show();
    this.taxService.getTaxesByArticleId(articleId).subscribe(
      data => {
        const taxesSelected = [];
        for (const item of data) {
          taxesSelected.push(item.id);
        }
        this.taxesObj.value = taxesSelected;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  blurUnitPrice(event) {
    const element = event.target;
    const valueUnitPrice = parseFloat(numeral(element.value).value());

    if (!isNaN(valueUnitPrice)) {
      this.itemCalculation(valueUnitPrice);
    }
  }

  itemCalculation(unitPrice) {
    this.article.unitPrice = numeral(unitPrice).format('$0,0.0000');
  }

  saveForm() {

    this.submitted = true;

    if (this.formArticle.invalid) {
      return;
    }

    const articleSave: any = {};

    const taxesSave = [];
    if (this.taxesObj.value != null) {
      for (const map of this.taxesObj.value) {
        taxesSave.push({ id: map });
      }
    }

    articleSave.id = this.article.id;
    articleSave.name = this.article.name.trim();
    articleSave.description = this.article.description.trim();
    articleSave.createBy = this.currentUser.userName;
    articleSave.articleTypeId = this.article.articleTypeId;
    articleSave.unitMeasureId = this.article.unitMeasureId;
    articleSave.code = this.article.code;
    articleSave.unitPrice = numeral(this.article.unitPrice).value();
    articleSave.dimension = (this.article.dimension === null) ? this.article.dimension : this.article.dimension.trim();
    articleSave.taxes = taxesSave;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.articleService.saveArticle(articleSave).subscribe(data => {
          this.alertMessageService.successMessage('Artículo guardado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.articleService.updateArticle(articleSave).subscribe(data => {
          this.alertMessageService.successMessage('Artículo editado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  public onChange(): void {
    // enable or disable the select all in Multiselect based on CheckBox checked state
    this.taxesObj.showSelectAll = this.checkboxObj.checked;
  }
  public onChangeDrop(): void {
    // enable or disable the dropdown button in Multiselect based on CheckBox checked state
    this.taxesObj.showDropDownIcon = this.dropdownObj.checked;
  }
  public onChangeReorder(): void {
    // enable or disable the list reorder in Multiselect based on CheckBox checked state
    this.taxesObj.enableSelectionOrder = this.reorderObj.checked;
  }
}
