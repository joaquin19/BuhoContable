import { NgModule } from '@angular/core';

// Modules
import { ReconciliationAuthorizationRoutingModule } from './reconciliation-authorization-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { ReconciliationAuthorizationComponent } from './reconciliation-authorization.component';
import { ReconciliationAuthorizationListComponent } from './reconciliation-authorization-list/reconciliation-authorization-list.component';
import { ReconciliationAuthorizationFormComponent } from './reconciliation-authorization-form/reconciliation-authorization-form.component';
import { ReconciliationAuthorizationModalComponent } from './reconciliation-authorization-modal/reconciliation-authorization-modal.component';
import { ReconciliationAuthorizationDetailModalComponent } from './reconciliation-authorization-detail-modal/reconciliation-authorization-detail-modal.component';
import { ReconciliationAuthorizationDetailFormComponent } from './reconciliation-authorization-detail-form/reconciliation-authorization-detail-form.component';


@NgModule({
  declarations: [
    ReconciliationAuthorizationComponent,
    ReconciliationAuthorizationListComponent,
    ReconciliationAuthorizationFormComponent,
    ReconciliationAuthorizationModalComponent,
    ReconciliationAuthorizationDetailModalComponent,
    ReconciliationAuthorizationDetailFormComponent
  ],
  imports: [
    ReconciliationAuthorizationRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    ReconciliationAuthorizationModalComponent
  ]
})
export class ReconciliationAuthorizationModule { }
