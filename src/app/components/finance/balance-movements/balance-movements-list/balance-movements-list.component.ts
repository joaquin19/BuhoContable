import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { BalanceMovementHeaderService } from '@app/core/services/balance-movement-header.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { BalanceMovementsDetailModalComponent } from '../balance-movements-detail-modal/balance-movements-detail-modal.component';

@Component({
  selector: 'app-balance-movements-list',
  templateUrl: './balance-movements-list.component.html',
  styleUrls: ['./balance-movements-list.component.scss']
})
export class BalanceMovementsListComponent implements OnInit {

  @ViewChild('gridBalanceMovements', { static: false })
  public gridBalanceMovements: GridComponent;

  public listBalanceMovements: any;
  public listBalanceMovementsCreated: any;
  public listBalanceMovementsPendingAuthorize: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public currentUser: any;
  public actionForm = Action;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private balanceMovementHeaderService: BalanceMovementHeaderService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.gridLines = 'Both';
    this.selectOptions = { type: 'Single' };
    this.cols = [];
    this.listBalanceMovements = [];
    this.listBalanceMovementsCreated = [];
    this.listBalanceMovementsPendingAuthorize = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'id', header: 'ID', width: 150, visible: false },
      { field: 'folio', header: 'Folio', width: 150 },
      { field: 'bankId', header: 'Banco ID', width: 150, visible: false },
      { field: 'bankName', header: 'Banco', width: 150, textAlign: 'right' },
      { field: 'accountBankId', header: 'Cuenta BancoID', width: 150, visible: false },
      { field: 'accountBankName', header: 'Cuenta', width: 200 },
      { field: 'currencyId', header: 'Moneda ID', width: 250, visible: false },
      { field: 'currencyName', header: 'Moneda', width: 250 },
      { field: 'lastModification', header: 'Fecha', width: 150, textAlign: 'right' },
      { field: 'captureDate', header: 'Fecha Captura', width: 150 },
      { field: 'balance', header: 'Saldo', width: 180, format: '$0,0.00', }
    ];
    this.getBalanceMovements();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Lista Movimiento de Saldos.xlsx'
    };
    this.gridBalanceMovements.excelExport(excelExportProperties);
  }

  getBalanceMovements() {
    this.spinner.show();
    this.balanceMovementHeaderService.getBalanceMovements().subscribe(
      data => {
        this.listBalanceMovements = data;
        /*this.listBalanceMovementsCreated = this.listBalanceMovements
          .filter(o => o.statusId === this.balanceMovementStatus.Created);
        this.listBalanceMovementsPendingAuthorize = this.listBalanceMovements
          .filter(o => o.statusId === this.balanceMovementStatus.PendingAuthorize);*/
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(BalanceMovementsDetailModalComponent,
      {
        size: 'xl',
        backdrop: 'static',
        keyboard: false
      });

    modalRef.componentInstance.title = 'Detalle de Movimiento de Saldo';
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getBalanceMovements();
    });
  }

}
