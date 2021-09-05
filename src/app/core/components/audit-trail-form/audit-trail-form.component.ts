import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageService, AuthorizationProcessService } from '@app/core/services';
import * as moment from 'moment';

@Component({
  selector: 'app-audit-trail-form',
  templateUrl: './audit-trail-form.component.html',
  styleUrls: ['./audit-trail-form.component.scss']
})
export class AuditTrailFormComponent implements OnInit {

  @Input() processType = 0;
  @Input() item: any;

  public listAuditTrail: any;
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
    private authorizationProcessService: AuthorizationProcessService,
    private spinner: NgxSpinnerService
  ) {
    this.listAuditTrail = [];
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
    this.getAuthorizationProcess();
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

  getAuthorizationProcess() {
    this.spinner.show();
    this.authorizationProcessService.getAuthorizationsByProcessTypeId(this.processType, this.item.id).subscribe(
      data => {
        this.listAuditTrail = data;
        let i = 0;
        this.listAuditTrail.forEach(element => {
          this.listAuditTrail[i].dateAuthorization = (moment(element.createdOn, 'DD-MM-YYYY').format('DD-MM-yyyy'));
          i++;
        });
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.spinner.hide();
      });
  }

}
