import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  AlertMessageService, AccountPayableService, AccountPayableStatusService, BankService,
  PurchaseOrderDetailService, SessionService, TaxService
} from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgForm } from '@angular/forms';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import * as numeral from 'numeral';
import { PurchaseOrderDetailTaxService } from '@app/core/services/purchase-order-detail-tax.service';

@Component({
  selector: 'app-purchase-orders-received-edition-form',
  templateUrl: './purchase-orders-received-edition-form.component.html',
  styleUrls: ['./purchase-orders-received-edition-form.component.scss']
})
export class PurchaseOrdersReceivedEditionFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formPurchaseOrdersReceivedEdition', { static: false })
  public formPurchaseOrdersReceivedEdition: NgForm;
  @ViewChild('bankObj', { static: false })
  public bankObj: DropDownListComponent;
  @ViewChild('statusObj', { static: false })
  public statusObj: DropDownListComponent;

  public purchaseOrdersReceivedEdition: any;
  public listAccountPayableStatus: any;
  public listPurchaseOrderDetail: any;
  public listBanks: any;
  public cols: any;
  public submitted: boolean;
  public currentUser: any;
  public listTaxes: any;
  public listTaxesDetail: any;
  public listTaxesAdded: any;
  public total: any;
  public subTotal: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private accountPayableService: AccountPayableService,
    private accountPayableStatusService: AccountPayableStatusService,
    private bankService: BankService,
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    private purchaseOrderDetailTaxService: PurchaseOrderDetailTaxService,
    private taxService: TaxService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.purchaseOrdersReceivedEdition = {
      id: 0,
      accountPayableStatusId: null,
      accountPayableStatusName: '',
      bankId: null,
      bankName: '',
      paymentReference: '',
      folio: '',
      purchaseOrderTypeId: 0,
      purchaseOrderTypeName: '',
      businessUnitId: 0,
      businessUnitName: '',
      costCenterId: 0,
      costCenterName: '',
      requisitionHeader: 0,
      supplierId: 0,
      supplierName: '',
      supplierContactId: 0,
      supplierContactName: '',
      paymentTypeId: 0,
      paymentTypeName: '',
      statusId: 0,
      statusNameName: '',
      startPeriod: '',
      endPeriod: '',
      estimatedDate: '',
      subTotal: 0,
      total: 0,
      notes: '',
      observations: '',
      createBy: '',
      createdOn: ''
    };
    this.listTaxesDetail = [];
    this.total = 0;
    this.subTotal = 0;
    this.listAccountPayableStatus = [];
    this.listPurchaseOrderDetail = [];
    this.listBanks = [];
    this.cols = [];
    this.submitted = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'code', header: 'NO. PARTE', width: 80 },
      { field: 'name', header: 'DESCRIPCIÓN', width: 250 },
      { field: 'quantity', header: 'CANTIDAD', width: 80 },
      { field: 'unitMeasureName', header: 'U/M', width: 80 },
      { field: 'dimension', header: 'DIMENSIÓN', width: 100, visible: false },
      { field: 'unitPrice', header: 'PRECIO UNITARIO', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'subTotal', header: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000' },
      { field: 'total', header: 'PRECIO TOTAL', width: 120, textAlign: 'right', format: '$0,0.0000', visible: false }
    ];
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Edit:
        this.purchaseOrdersReceivedEdition = {
          id: this.item.id,
          accountPayableStatusId: this.item.accountPayableStatusId,
          accountPayableStatusName: this.item.accountPayableStatusName,
          bankId: this.item.bankId,
          bankName: this.item.bankName,
          paymentReference: this.item.paymentReference,
          folio: this.item.folio,
          purchaseOrderTypeId: this.item.purchaseOrderTypeId,
          purchaseOrderTypeName: this.item.purchaseOrderTypeName,
          businessUnitId: this.item.businessUnitId,
          businessUnitName: this.item.businessUnitName,
          costCenterId: this.item.costCenterId,
          costCenterName: this.item.costCenterName,
          requisitionHeader: this.item.requisitionHeader,
          supplierId: this.item.supplierId,
          supplierName: this.item.supplierName,
          supplierContactId: this.item.supplierContactId,
          supplierContactName: this.item.supplierContactName,
          paymentTypeId: this.item.paymentTypeId,
          paymentTypeName: this.item.paymentTypeName,
          statusId: this.item.statusId,
          statusNameName: this.item.statusNameName,
          startPeriod: this.item.startPeriod,
          endPeriod: this.item.endPeriod,
          estimatedDate: this.item.estimatedDate,
          subTotal: this.item.subTotal,
          total: this.item.total,
          notes: this.item.notes,
          observations: this.item.observations,
          createBy: this.item.createBy,
          createdOn: this.item.createdOn
        };

        this.purchaseOrdersReceivedEdition.supplierContactName =
          this.purchaseOrdersReceivedEdition.supplierContactName !== null ? this.purchaseOrdersReceivedEdition.supplierContactName : '';
        this.purchaseOrdersReceivedEdition.supplierPhone =
          this.purchaseOrdersReceivedEdition.supplierPhone !== null ? this.purchaseOrdersReceivedEdition.supplierPhone : '';
        this.purchaseOrdersReceivedEdition.notes =
          this.purchaseOrdersReceivedEdition.notes !== null ? this.purchaseOrdersReceivedEdition.notes : '';
        this.purchaseOrdersReceivedEdition.observations =
          this.purchaseOrdersReceivedEdition.observations !== null ? this.purchaseOrdersReceivedEdition.observations : '';
        this.purchaseOrdersReceivedEdition.startPeriod =
          this.purchaseOrdersReceivedEdition.startPeriod !== null ? this.purchaseOrdersReceivedEdition.startPeriod : '';
        this.purchaseOrdersReceivedEdition.endPeriod =
          this.purchaseOrdersReceivedEdition.endPeriod !== null ? this.purchaseOrdersReceivedEdition.endPeriod : '';
        this.purchaseOrdersReceivedEdition.period =
          this.purchaseOrdersReceivedEdition.startPeriod + ' - ' + this.purchaseOrdersReceivedEdition.endPeriod;
        break;
    }

    this.getAccountPayableStatus();
    this.getPurchaseOrderDetail();
    this.getBanks();
    this.getPurchaseOrderDetailTaxByHeader(this.purchaseOrdersReceivedEdition.id);
  }

  getPurchaseOrderDetail() {
    this.spinner.show();
    this.purchaseOrderDetailService.getPurchaseOrderDetailByHeaderId(this.purchaseOrdersReceivedEdition.id).subscribe(
      data => {
        this.listPurchaseOrderDetail = data;
        this.spinner.hide();
      }, error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getBanks() {
    this.spinner.show();
    this.bankService.getBanks().subscribe(
      data => {
        this.listBanks = data;
        this.bankObj.value = this.action === Action.Edit ? this.purchaseOrdersReceivedEdition.bankId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringBank: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listBanks, query);
  }

  getAccountPayableStatus() {
    this.spinner.show();
    this.accountPayableStatusService.getAccountPayableStatus().subscribe(
      data => {
        this.listAccountPayableStatus = data;
        this.statusObj.value = this.action === Action.Edit ? this.purchaseOrdersReceivedEdition.accountPayableStatusId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringStatus: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listAccountPayableStatus, query);
  }

  saveForm() {
    this.submitted = true;

    if (this.formPurchaseOrdersReceivedEdition.invalid) {
      return;
    }

    const accountPayableSave: any = {};
    accountPayableSave.id = this.purchaseOrdersReceivedEdition.id;
    accountPayableSave.accountPayableStatusId = this.purchaseOrdersReceivedEdition.accountPayableStatusId;
    accountPayableSave.bankId = this.purchaseOrdersReceivedEdition.bankId;
    accountPayableSave.paymentReference = this.purchaseOrdersReceivedEdition.paymentReference;
    accountPayableSave.createBy = this.currentUser.userName;

    this.spinner.show();
    this.accountPayableService.updateAccountPayable(accountPayableSave).subscribe(data => {
      this.alertMessageService.successMessage('Cuenta por Pagar editada correctamente.');
      this.spinner.hide();
      this.saveItem.emit(true);
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  getPurchaseOrderDetailTaxByHeader(purchaseOrderId) {
    this.spinner.show();
    this.purchaseOrderDetailTaxService.GetPurchaseOrderDetailTaxByPOH(purchaseOrderId).subscribe(
      data => {
        this.listTaxesDetail = data;
        this.getTaxes();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getTaxes() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      data => {
        this.listTaxes = data;
        for (const item of this.listTaxes) {
          item.amount = 0;
        }
        this.calculationTaxes();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  calculationTaxes() {
    for (const itemT of this.listTaxes) {
      itemT.amount = 0;
    }
    for (const itemD of this.listTaxesDetail) {
      for (const itemT of this.listTaxes) {
        if (itemD.taxId === itemT.id) {
          itemT.amount = numeral(numeral(itemT.amount).value() + numeral(itemD.amount).value()).format('$0,0.0000');
        }
      }
    }
    this.listTaxesAdded = [];
    this.listTaxesAdded = this.listTaxes.filter(({ id }) => this.listTaxesDetail.some(o => o.taxId === id));
    this.calculationTotal();
  }

  calculationTotal() {
    this.total = 0;
    this.subTotal = 0;
    for (const item of this.listPurchaseOrderDetail) {
      this.subTotal = numeral(numeral(this.subTotal).value() + item.subTotal).format('$0,0.0000');
      this.total = numeral(numeral(this.total).value() + item.total).format('$0,0.0000');
    }
  }

}
