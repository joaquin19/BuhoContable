import { NgModule } from '@angular/core';

// Modules
import { ReconciliationRoutingModule } from './reconciliation-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { ReconciliationComponent } from './reconciliation.component';
import { ReconciliationListComponent } from './reconciliation-list/reconciliation-list.component';
import { ReconciliationFormComponent } from './reconciliation-form/reconciliation-form.component';
import { ReconciliationDetailModalComponent } from './reconciliation-detail-modal/reconciliation-detail-modal.component';
import { ReconciliationDetailFormComponent } from './reconciliation-detail-form/reconciliation-detail-form.component';
import { ReconciliationEditionFormComponent } from './reconciliation-edition-form/reconciliation-edition-form.component';
import { ReconciliationEditionModalComponent } from './reconciliation-edition-modal/reconciliation-edition-modal.component';


@NgModule({
  declarations: [
    ReconciliationComponent,
    ReconciliationListComponent,
    ReconciliationFormComponent,
    ReconciliationDetailModalComponent,
    ReconciliationDetailFormComponent,
    ReconciliationEditionFormComponent,
    ReconciliationEditionModalComponent
  ],
  imports: [
    ReconciliationRoutingModule,
    LayoutModule
  ]
})
export class ReconciliationModule { }
