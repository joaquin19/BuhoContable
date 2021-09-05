import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReconciliationAuthorizationDetailFormComponent } from './reconciliation-authorization-detail-form/reconciliation-authorization-detail-form.component';
import { ReconciliationAuthorizationFormComponent } from './reconciliation-authorization-form/reconciliation-authorization-form.component';
import { ReconciliationAuthorizationComponent } from './reconciliation-authorization.component';


const routes: Routes = [
  {
    path: '',
    component: ReconciliationAuthorizationComponent
  },
  {
    path: 'addReconciliationAuthorization',
    component: ReconciliationAuthorizationFormComponent
  },
  {
    path: 'editReconciliationAuthorization/:id',
    component: ReconciliationAuthorizationFormComponent
  },
  {
    path: 'detailReconciliationAuthorization/:id',
    component: ReconciliationAuthorizationDetailFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconciliationAuthorizationRoutingModule { }
