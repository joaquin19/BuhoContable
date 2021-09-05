import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportProperties, FilterSettingsModel, GridComponent, GridLine, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountsBanksModalComponent } from '../accounts-banks-modal/accounts-banks-modal.component';
import Swal from 'sweetalert2';
import { AccountBankService } from '@app/core/services/account-bank.service';
import { AccountsBanksDetailModalComponent } from '../accounts-banks-detail-modal/accounts-banks-detail-modal.component';

@Component({
  selector: 'app-accounts-banks-list',
  templateUrl: './accounts-banks-list.component.html',
  styleUrls: ['./accounts-banks-list.component.scss']
})
export class AccountsBanksListComponent implements OnInit {

  @ViewChild('gridAccountsBanks', { static: false })
  public gridAccountsBanks: GridComponent;

  public listAccountsBanks: any;
  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public gridLines: GridLine;
  public selectOptions: any;
  public actionForm = Action;
  public currentUser: any;

  constructor(
    private projectSettings: ProjectSettings,
    private alertMessageService: AlertMessageService,
    private accountBankService: AccountBankService,
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
    this.listAccountsBanks = [];
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'id', header: 'ID', width: 250, visible: false },
      { field: 'name', header: 'Nombre', width: 250 },
      { field: 'description', header: 'Descripción', width: 350 },
      { field: 'bankId', header: 'Banco', width: 150, visible: false },
      { field: 'bankName', header: 'Banco', width: 150 },
      { field: 'branchOffice', header: 'Sucursal', width: 150 },
      { field: 'currencyName', header: 'Moneda', width: 200 },
      { field: 'currencyId', header: 'Banco', width: 150, visible: false },
      { field: 'balance', header: 'Saldo', width: 150, format: '$0,0.0000' },
      { field: 'accountNumber', header: 'Número de Cuenta', width: 150, visible: false },
      { field: 'clabe', header: 'Clabe', width: 150, visible: false },
      { field: 'deleted', header: 'Eliminado', width: 150, visible: false }
    ];
    this.getAccountsBanks();
  }

  exportToExcelList() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'Catálogo de Cuentas Bancarias.xlsx'
    };
    this.gridAccountsBanks.excelExport(excelExportProperties);
  }

  getAccountsBanks() {
    this.spinner.show();
    this.accountBankService.getAccountBanks().subscribe(
      data => {
        this.listAccountsBanks = data;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  confirmInactive(item) {
    const elem = this;
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Confirmación',
      html: `¿Desea inactivar la cuenta <strong>${item.name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        elem.inactiveAccountsBanks(item.id, this.currentUser.userName);
      }
    });
  }

  openModal(action: Action, item: any) {
    const modalRef = this.modalService.open(AccountsBanksModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.Create:
        modalRef.componentInstance.title = 'Nueva Cuenta Bancaria';
        break;
      case Action.Edit:
        modalRef.componentInstance.title = 'Editar Cuenta Bancaria';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getAccountsBanks();
    });
  }

  openModalDetail(action: Action, item: any) {
    const modalRef = this.modalService.open(AccountsBanksDetailModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });

    switch (action) {
      case Action.None:
        modalRef.componentInstance.title = 'Detalle Cuenta Bancaria';
        break;
    }
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.item = item;
    modalRef.result.then((e) => {
      this.getAccountsBanks();
    });
  }

  inactiveAccountsBanks(accountBankId, createBy) {
    this.spinner.show();
    this.accountBankService.updateAccountBankInactive(accountBankId, createBy).subscribe(
      data => {
        this.alertMessageService.successMessage('Cuenta Bancaria inactivada correctamente.');
        this.getAccountsBanks();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
