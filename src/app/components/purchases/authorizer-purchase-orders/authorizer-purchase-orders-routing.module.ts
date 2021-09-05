import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthorizerPurchaseOrdersComponent } from './authorizer-purchase-orders.component';
import { AuthorizerPurchaseOrdersFormComponent } from './authorizer-purchase-orders-form/authorizer-purchase-orders-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizerPurchaseOrdersComponent
  },
  {
    path: 'addAuthorizerPurchaseOrders',
    component: AuthorizerPurchaseOrdersFormComponent
  },
  {
    path: 'editAuthorizerPurchaseOrders/:id',
    component: AuthorizerPurchaseOrdersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizerPurchaseOrdersRoutingModule { }
