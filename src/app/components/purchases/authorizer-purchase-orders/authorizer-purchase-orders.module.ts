import { NgModule } from '@angular/core';

// Modules
import { AuthorizerPurchaseOrdersRoutingModule } from './authorizer-purchase-orders-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { AuthorizerPurchaseOrdersComponent } from './authorizer-purchase-orders.component';
import { AuthorizerPurchaseOrdersListComponent } from './authorizer-purchase-orders-list/authorizer-purchase-orders-list.component';
import { AuthorizerPurchaseOrdersFormComponent } from './authorizer-purchase-orders-form/authorizer-purchase-orders-form.component';
import { AuthorizerPurchaseOrdersModalComponent } from './authorizer-purchase-orders-modal/authorizer-purchase-orders-modal.component';
import { AuthorizerPurchaseOrdersDetailModalComponent } from './authorizer-purchase-orders-detail-modal/authorizer-purchase-orders-detail-modal.component';
import { AuthorizerPurchaseOrdersDetailFormComponent } from './authorizer-purchase-orders-detail-form/authorizer-purchase-orders-detail-form.component';

@NgModule({
  declarations: [
    AuthorizerPurchaseOrdersComponent,
    AuthorizerPurchaseOrdersListComponent,
    AuthorizerPurchaseOrdersFormComponent,
    AuthorizerPurchaseOrdersModalComponent,
    AuthorizerPurchaseOrdersDetailModalComponent,
    AuthorizerPurchaseOrdersDetailFormComponent
  ],
  imports: [
    AuthorizerPurchaseOrdersRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    AuthorizerPurchaseOrdersModalComponent
  ]
})
export class AuthorizerPurchaseOrdersModule { }
