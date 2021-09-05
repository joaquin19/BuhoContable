import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessageService, PurchaseOrderHeaderService, SessionService } from '@app/core/services';
import { FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchaseOrderStatus } from '@app/core/enums';
import { ReconciliationHeaderService } from '@app/core/services/reconciliation-header.service';

@Component({
  selector: 'app-reconciliation-form',
  templateUrl: './reconciliation-form.component.html',
  styleUrls: ['./reconciliation-form.component.scss']
})
export class ReconciliationFormComponent implements OnInit {

  @ViewChild('gridPurchaseOrders', { static: false })
  public gridPurchaseOrders: GridComponent;

  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public colsPurchaseOrders: any;
  public listPurchaseOrders: any;
  public titleHeader: string;
  public currentUser: any;
  public pageRedirect: string;
  public pageRedirectNew: string;
  public purchaseOrderStatus = PurchaseOrderStatus;
  public diferentSupplier: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseOrderHeaderService: PurchaseOrderHeaderService,
    private reconciliationHeaderService: ReconciliationHeaderService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private alertMessageService: AlertMessageService
  ) {
    this.listPurchaseOrders = [{
      id: 0
    }];
    this.titleHeader = '';
    this.pageRedirect = '/purchases/reconciliation';
    this.pageRedirectNew = '/purchases/reconciliation/addInvoice';
    this.diferentSupplier = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.colsPurchaseOrders = [
      { field: 'id', header: 'ID', width: 80, visible: false },
      { field: 'folio', header: 'NO. OC', width: 80 },
      { field: 'createdOn', header: 'FECHA EMISIÓN', width: 100 },
      { field: 'supplierName', header: 'PROVEEDOR', width: 250 },
      { field: 'currencyId', header: 'TIOPO MONEDA ID', width: 50, visible: false },
      { field: 'currencyName', header: 'TIPO MONEDA', width: 90 },
      { field: 'subTotal', header: 'SUB TOTAL', width: 120, textAlign: 'right', format: '$0,0.00' },
      { field: 'total', header: 'PRECIO TOTAL', width: 120, format: '$0,0.00' }
    ];
    this.showForm();
    this.getPurchaseOrders();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        this.titleHeader = 'Selección de Órdenes de Compra a Conciliar';
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
  }

  getPurchaseOrders() {
    this.spinner.show();
    this.purchaseOrderHeaderService.getPurchaseOrdersNoReconciliation(this.currentUser.userName).subscribe(
      data => {
        this.listPurchaseOrders = data;
        this.listPurchaseOrders = this.listPurchaseOrders
          .filter(o => o.statusId === this.purchaseOrderStatus.Authorized);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  saveForm() {
    const reconciliationSave: any = {};
    let PurchaseOrdersSelected: any = [];
    reconciliationSave.reconciliationPurchaseOrderDetail = [];

    PurchaseOrdersSelected = this.gridPurchaseOrders.getSelectedRecords();

    let SupplierId = 0;
    let CurrencyId = 0;
    if (PurchaseOrdersSelected.length > 0) {
      SupplierId = PurchaseOrdersSelected[0].supplierId;
      CurrencyId = PurchaseOrdersSelected[0].currencyId;
    } else {
      this.alertMessageService.warningMessage('Favor de seleccionar al menos una orden de compra');
    }

    PurchaseOrdersSelected.forEach(element => {
      if (SupplierId != element.supplierId) {
        this.alertMessageService.warningMessage('Las órdenes de compra deben ser del mismo proveedor para una conciliación');
        this.diferentSupplier = true;
      }

      if (CurrencyId != element.currencyId) {
        this.alertMessageService.warningMessage('Las órdenes de compra deben tener el mismo tipo de moneda para una conciliación');
        this.diferentSupplier = true;
      }
      reconciliationSave.reconciliationPurchaseOrderDetail.push({
        purchaseOrderHeaderId: element.id
      });
    });

    if (this.diferentSupplier === true) {
      return;
    }

    console.log(reconciliationSave);
    reconciliationSave.SupplierId = PurchaseOrdersSelected[0].supplierId;
    reconciliationSave.CurrencyId = PurchaseOrdersSelected[0].currencyId;
    reconciliationSave.SupplierPaymentTermId = PurchaseOrdersSelected[0].paymentTermId;
    reconciliationSave.SupplierContactId = (PurchaseOrdersSelected[0].supplierContactId > 0) ? PurchaseOrdersSelected[0].supplierContactId : null;
    reconciliationSave.PhoneContact = PurchaseOrdersSelected[0].supplierPhone;
    reconciliationSave.PaymentTypeId = PurchaseOrdersSelected[0].paymentTypeId;
    reconciliationSave.ReceptionDate = PurchaseOrdersSelected[0].estimatedDate;
    reconciliationSave.createBy = this.currentUser.userName;
    console.log(reconciliationSave);

    this.spinner.show();
    this.reconciliationHeaderService.saveReconciliation(reconciliationSave).subscribe(data => {
      this.alertMessageService.successMessage('Conciliación guardada correctamente.');
      console.log(data);
      this.pageRedirectNew = this.pageRedirectNew + `/${data.id}`;
      console.log(this.pageRedirectNew);
      this.router.navigate([this.pageRedirectNew]);
      this.spinner.hide();
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

}
