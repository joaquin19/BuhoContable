import { NgModule } from '@angular/core';

// Modules
import { BalanceMovementsRoutingModule } from './balance-movements-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { BalanceMovementsComponent } from './balance-movements.component';
import { BalanceMovementsListComponent } from './balance-movements-list/balance-movements-list.component';
import { BalanceMovementsFormComponent } from './balance-movements-form/balance-movements-form.component';
import { BalanceMovementsDetailModalComponent } from './balance-movements-detail-modal/balance-movements-detail-modal.component';
import { BalanceMovementsDetailFormComponent } from './balance-movements-detail-form/balance-movements-detail-form.component';


@NgModule({
  declarations: [
    BalanceMovementsComponent,
    BalanceMovementsListComponent,
    BalanceMovementsFormComponent,
    BalanceMovementsDetailModalComponent,
    BalanceMovementsDetailFormComponent
  ],
  imports: [
    BalanceMovementsRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    BalanceMovementsDetailFormComponent
  ]
})
export class BalanceMovementsModule { }
