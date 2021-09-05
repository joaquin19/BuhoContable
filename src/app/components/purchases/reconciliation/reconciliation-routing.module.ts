import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReconciliationDetailFormComponent } from './reconciliation-detail-form/reconciliation-detail-form.component';
import { ReconciliationEditionFormComponent } from './reconciliation-edition-form/reconciliation-edition-form.component';
import { ReconciliationFormComponent } from './reconciliation-form/reconciliation-form.component';
import { ReconciliationComponent } from './reconciliation.component';


const routes: Routes = [
  {
    path: '',
    component: ReconciliationComponent
  },
  {
    path: 'addReconciliation',
    component: ReconciliationFormComponent
  },
  {
    path: 'editReconciliation/:id',
    component: ReconciliationEditionFormComponent
  },
  {
    path: 'addInvoice/:id',
    component: ReconciliationEditionFormComponent
  },
  {
    path: 'detailReconciliation/:id',
    component: ReconciliationDetailFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconciliationRoutingModule { }
