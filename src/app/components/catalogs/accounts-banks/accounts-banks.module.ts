import { NgModule } from '@angular/core';
// Modules

import { AccountsBanksRoutingModule } from './accounts-banks-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { AccountsBanksComponent } from './accounts-banks.component';
import { AccountsBanksListComponent } from './accounts-banks-list/accounts-banks-list.component';
import { AccountsBanksFormComponent } from './accounts-banks-form/accounts-banks-form.component';
import { AccountsBanksModalComponent } from './accounts-banks-modal/accounts-banks-modal.component';
import { AccountsBanksDetailModalComponent } from './accounts-banks-detail-modal/accounts-banks-detail-modal.component';
import { AccountsBanksDetailFormComponent } from './accounts-banks-detail-form/accounts-banks-detail-form.component';


@NgModule({
  declarations: [
    AccountsBanksComponent,
    AccountsBanksListComponent,
    AccountsBanksFormComponent,
    AccountsBanksModalComponent,
    AccountsBanksDetailModalComponent,
    AccountsBanksDetailFormComponent
  ],
  imports: [
    AccountsBanksRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    AccountsBanksModalComponent,
    AccountsBanksDetailModalComponent
  ]
})
export class AccountsBanksModule { }
