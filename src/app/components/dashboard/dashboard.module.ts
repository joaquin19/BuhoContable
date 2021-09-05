import { NgModule } from '@angular/core';

// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from '../layout/layout.module';

// Components
import { DashboardComponent } from './dashboard.component';
import { ChartRequisitionsEstatusComponent } from './chart-requisitions-estatus/chart-requisitions-estatus.component';
import { ChartPurchaseOrdersEstatusComponent } from './chart-purchase-orders-estatus/chart-purchase-orders-estatus.component';
import { ChartAccountsComponent } from './chart-accounts/chart-accounts.component';
import { ChartExpensesBusinessUnitComponent } from './chart-expenses-business-unit/chart-expenses-business-unit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartRequisitionsEstatusComponent,
    ChartPurchaseOrdersEstatusComponent,
    ChartAccountsComponent,
    ChartExpensesBusinessUnitComponent
  ],
  imports: [
    DashboardRoutingModule,
    LayoutModule
  ]
})
export class DashboardModule { }
