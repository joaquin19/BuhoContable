import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersFormComponent } from './purchase-orders-form/purchase-orders-form.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrdersComponent
  },
  {
    path: 'addPurchaseOrder',
    component: PurchaseOrdersFormComponent
  },
  {
    path: 'editPurchaseOrder/:id',
    component: PurchaseOrdersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrdersRoutingModule { }
