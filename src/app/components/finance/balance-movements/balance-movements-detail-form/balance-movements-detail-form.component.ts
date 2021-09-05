import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Action } from '@app/core/enums';
import { AlertMessageService } from '@app/core/services';
import { BalanceMovementDetailService } from '@app/core/services/balance-movement-detail.service';
import { BalanceMovementHeaderService } from '@app/core/services/balance-movement-header.service';
import { EditSettingsModel, FilterSettingsModel, GridComponent, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-balance-movements-detail-form',
  templateUrl: './balance-movements-detail-form.component.html',
  styleUrls: ['./balance-movements-detail-form.component.scss']
})
export class BalanceMovementsDetailFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;

  @ViewChild('gridBalanceMovementDetail', { static: false })
  public gridBalanceMovementDetail: GridComponent;

  public listBalanceMovement: any;
  public balanceMovement: any;
  public listBalanceMovementDetail: any;
  public titleHeader: string;

  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private balanceMovementHeaderService: BalanceMovementHeaderService,
    private balanceMovementDetailService: BalanceMovementDetailService,
    private spinner: NgxSpinnerService
  ) {
    this.balanceMovement = [];
    this.listBalanceMovementDetail = [];
    this.listBalanceMovement = [];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'orderNumber', header: 'Orden', width: 80 },
      { field: 'movementDate', header: 'Fecha', width: 150 },
      { field: 'concept', header: 'Concepto', width: 350 },
      { field: 'balanceMovementTypeId', header: 'Tipo Movimiento', width: 150, visible: false },
      { field: 'balanceMovementTypeName', header: 'Tipo Movimiento', width: 150 },
      { field: 'amount', header: 'Monto', width: 200, format: '$0,0.0000' },
      { field: 'balance', header: 'Saldo', width: 150, format: '$0,0.0000' }
    ];
    this.showForm();
  }

  showForm() {
    this.titleHeader = 'Detalle de Movimientos de Saldos';
    this.getBalanceMovementByIdAccountBankId(this.item.id, this.item.accountBankId);
  }

  getBalanceMovementByIdAccountBankId(balanceMovementId, accountBankId) {
    this.spinner.show();
    this.balanceMovementHeaderService.getBalanceMovementByIdAccountBankId(balanceMovementId, accountBankId).subscribe(
      data => {
        this.balanceMovement = data;
        this.getBalanceMovementDetailByHeaderId(this.balanceMovement.id);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getBalanceMovementDetailByHeaderId(balanceMovementId) {
    this.spinner.show();
    this.balanceMovementDetailService.getBalanceMovementDetailByHeaderId(balanceMovementId).subscribe(
      data => {
        this.listBalanceMovementDetail = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
