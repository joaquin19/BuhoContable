import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageService } from '@app/core/services';
import * as moment from 'moment';
import { BalanceMovementHeaderService } from '@app/core/services/balance-movement-header.service';

@Component({
  selector: 'app-balance-movement-log-form',
  templateUrl: './balance-movement-log-form.component.html',
  styleUrls: ['./balance-movement-log-form.component.scss']
})
export class BalanceMovementLogFormComponent implements OnInit {

  @Input() item: any;

  public listBalanceMovement: any;
  alternate: boolean;
  toggle: boolean;
  color: boolean;
  size: number;
  expandEnabled: boolean;
  contentAnimation: boolean;
  dotAnimation: boolean;
  side = 'left';
  entries: any;
  dateCreated: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private balanceMovementHeaderService: BalanceMovementHeaderService,
    private spinner: NgxSpinnerService
  ) {
    this.listBalanceMovement = [];
    this.alternate = true;
    this.toggle = true;
    this.color = false;
    this.size = 40;
    this.expandEnabled = true;
    this.contentAnimation = true;
    this.dotAnimation = true;

  }

  ngOnInit(): void {
    this.dateCreated = (moment(this.item.createdOn, 'DD-MM-YYYY').format('DD-MM-yyyy'));
    this.getBalanceMovements();
  }

  onExpandEntry(expanded, index) {
    // console.log(`Expand status of entry #${index} changed to ${expanded}`);
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  getBalanceMovements() {
    this.spinner.show();
    console.log(this.item);
    console.log(this.item.accountBankId);
    this.balanceMovementHeaderService.getBalanceMovementByAccountBankId(this.item.accountBankId).subscribe(
      data => {
        this.listBalanceMovement = data;
        console.log(this.listBalanceMovement);
        let i = 0;
        // this.listBalanceMovement.forEach(element => {
        //   this.listBalanceMovement[i].date = (moment(element.createdOn, 'DD-MM-YYYY').format('DD-MM-yyyy'));
        //   i++;
        // });
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.spinner.hide();
      });
  }

}
