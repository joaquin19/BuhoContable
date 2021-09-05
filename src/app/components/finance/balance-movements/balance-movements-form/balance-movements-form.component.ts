import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService } from '@app/core/services';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EventEmitter } from 'events';
import { NgxSpinnerService } from 'ngx-spinner';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { AccountBankService } from '@app/core/services/account-bank.service';
import * as numeral from 'numeral';
import * as moment from 'moment';
import { EditSettingsModel, FilterSettingsModel, GridComponent, PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ProjectSettings } from '@app/core/constants';
import xlsxParser from 'xlsx-parse-json';
import { BalanceMovementType } from '@app/core/enums/balance-movement-type';
import { BalanceMovementHeaderService } from '@app/core/services/balance-movement-header.service';
import Swal from 'sweetalert2';
import { DownloadFileService } from '@app/core/services/download-file.service';
import { saveAs } from 'file-saver';
import { Template } from '@app/core/enums/template';

@Component({
  selector: 'app-balance-movements-form',
  templateUrl: './balance-movements-form.component.html',
  styleUrls: ['./balance-movements-form.component.scss']
})
export class BalanceMovementsFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('gridBalanceMovementDetail', { static: false })
  public gridBalanceMovementDetail: GridComponent;
  @ViewChild('formBalanceMovement', { static: false })
  public formBalanceMovement: NgForm;
  @ViewChild('accountBankObj', { static: false })
  public accountBankObj: DropDownListComponent;

  public mode: string;
  public filterPlaceholder: string;
  public submitted: boolean;
  public titleHeader: string;
  public listHeaders: any;
  public listAccountsBank: any;
  public listBalanceMovement: any;
  public listMovement: any;
  public balanceMovement: any;
  public maxLengthDescription: number;
  public pageRedirect: string;
  public currentUser: any;
  public typesFiles: string[];
  public nameFile: string;
  public balanceMovementType: any;
  public template: any;

  public cols: any;
  public itemsPage: any;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public filterGrid: any;
  public editOptions: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];

  constructor(
    private projectSettings: ProjectSettings,
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private balanceMovementHeaderService: BalanceMovementHeaderService,
    private accountBankService: AccountBankService,
    private downloadFileService: DownloadFileService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.itemsPage = this.projectSettings.itemsPage();
    this.pageSettings = { pageSizes: this.itemsPage, pageSize: 10 };
    this.filterOptions = { type: 'Excel', ignoreAccent: true };
    this.filterGrid = { type: 'Excel' };
    this.editOptions = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Normal' };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.pageRedirect = '/finance/balance-movements';
    this.balanceMovementType = BalanceMovementType;
    this.submitted = false;
    this.titleHeader = '';
    this.listHeaders = [];
    this.listAccountsBank = [];
    this.listBalanceMovement = [];
    this.listMovement = [];
    this.balanceMovement = {
      id: 0,
      name: '',
      description: '',
      accountBankId: null,
      unitMeasureName: '',
      code: '',
      unitPrice: null,
      dimension: null,
      tax: {}
    };
    this.typesFiles = ['.xlsx'];
    this.template = Template;
    this.nameFile = 'Platilla_Movimientos_Saldos.xlsx';

  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.cols = [
      { field: 'OrderNumber', header: 'Orden', width: 150 },
      { field: 'MovementDate', header: 'Fecha', width: 150 },
      { field: 'Concept', header: 'Concepto', width: 350 },
      { field: 'BalanceMovementTypeId', header: 'Tipo Movimiento', width: 150, visible: false },
      { field: 'BalanceMovementTypeName', header: 'Tipo Movimiento', width: 150 },
      { field: 'Amount', header: 'Monto', width: 200, format: '$0,0.0000' },
      { field: 'Balance', header: 'Saldo', width: 150, format: '$0,0.0000' }
    ];
    this.showForm();
  }

  onChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files[0];
    const typeSheet = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    file != null ? this.spinner.show() : this.spinner.hide();
    if (file.type === typeSheet) {
      xlsxParser.onFileSelection(file).then(data => {
        console.log(data);

        if (data.Sheet1 != null && data?.Sheet1.length !== 0) {
          this.listMovement = data;
          this.listBalanceMovement = data?.Sheet1;
          this.listBalanceMovement.forEach(element => {
            element.Amount = (element.Cargo > 0) ? parseFloat(element.Cargo) : parseFloat(element.Abono);
            element.BalanceMovementTypeId = (element.Cargo > 0) ? this.balanceMovementType.Charge : this.balanceMovementType.Credit;
            element.BalanceMovementTypeName = (element.Cargo > 0) ? 'Cargo' : 'Abono';
            element.Balance = parseFloat(element.Saldo);
            element.MovementDate = moment(element.Date).format('YYYY-MM-DD');
          });
          console.log(this.listBalanceMovement);
          // this.listMovement.forEach(element => {
          //   element.monto = (element.Cargo != '') ? element.Cargo : element.Abono;
          //   element.tipoMovimientoId = (element.Cargo != '') ? this.balanceMovementType.Charge : this.balanceMovementType.Credit;
          //   element.tipoMovimientoName = (element.Cargo != '') ? 'Cargo' : 'Abono';
          // });
          this.spinner.hide();

        } else {
          this.alertMessageService.warningMessage('El Documento no es una lista de movimientos de Saldos');
        }
      });
    } else {
      this.alertMessageService.warningMessage(`Solo se permiten archivos de tipo ${this.typesFiles}`);
    }
  }

  showForm() {
    this.titleHeader = 'Carga de Movimientos de Saldos';
    switch (this.action) {
      case Action.Create:
        this.balanceMovement = {
          id: 0,
          name: '',
          description: '',
          accountBankId: null,
          articleTypeName: '',
          unitMeasureId: null,
          unitMeasureName: '',
          code: '',
          unitPrice: null,
          dimension: null
        };
        break;
    }

    this.getAccountsBank();
  }

  getAccountsBank() {
    this.spinner.show();
    this.accountBankService.getAccountBanks().subscribe(
      data => {
        this.listAccountsBank = data;
        console.log(this.accountBankObj);
        // this.accountBankObj.value = this.action === Action.Edit ? this.balanceMovement.accountBankId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringAccountsBank: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'id', e.text, true, true) : query;
    e.updateData(this.listAccountsBank, query);
  }

  confirm() {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Atención',
      html: `Está a punto de reportar los movimientosa la cuenta de banco <br><strong>${this.accountBankObj.text}</strong><br>¿Está seguro que los desea agregar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.saveForm();
      }
    });
  }

  saveForm() {

    this.submitted = true;

    if (this.formBalanceMovement.invalid) {
      // accountBank;
    }

    const balanceMovementSave: any = {};

    balanceMovementSave.AccountBankId = this.accountBankObj.value;
    balanceMovementSave.CreateBy = this.currentUser.userName;
    balanceMovementSave.CaptureDate = this.listBalanceMovement[this.listBalanceMovement.length - 1].MovementDate;
    balanceMovementSave.Balance = this.listBalanceMovement[this.listBalanceMovement.length - 1].Saldo;
    balanceMovementSave.BalanceMovementDetail = this.listBalanceMovement;
    console.log(balanceMovementSave);

    this.spinner.show();
    this.balanceMovementHeaderService.saveBalanceMovement(balanceMovementSave).subscribe(data => {
      this.alertMessageService.successMessage('Movimientos de saldo guardados correctamente.');
      this.spinner.hide();
      this.router.navigate([this.pageRedirect]);
    }, error => {
      this.alertMessageService.errorMessage(error.message);
    });
  }

  downloadTemplate() {
    this.spinner.show();
    this.downloadFileService.getTemplate(this.template.TemplateBalanceMovement).subscribe(
      data => {
        console.log(data);
        const blob: any = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, this.nameFile);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
