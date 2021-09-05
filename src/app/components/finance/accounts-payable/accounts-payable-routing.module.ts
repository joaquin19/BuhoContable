import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AccountsPayableComponent } from './accounts-payable.component';
import { PurchaseOrdersReceivedFormComponent } from './purchase-orders-received/purchase-orders-received-form/purchase-orders-received-form.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsPayableComponent
  },
  {
    path: 'addPurchaseOrder',
    component: PurchaseOrdersReceivedFormComponent
  },
  {
    path: 'editPurchaseOrder/:id',
    component: PurchaseOrdersReceivedFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsPayableRoutingModule { }
