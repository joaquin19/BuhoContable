import { NgModule } from '@angular/core';

// Modules
import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersListComponent } from './purchase-orders-list/purchase-orders-list.component';
import { PurchaseOrdersFormComponent } from './purchase-orders-form/purchase-orders-form.component';
import { PurchaseOrdersEditionFormComponent } from './purchase-orders-edition-form/purchase-orders-edition-form.component';
import { PurchaseOrdersEditionModalComponent } from './purchase-orders-edition-modal/purchase-orders-edition-modal.component';
import { PurchaseOrdersDetailModalComponent } from './purchase-orders-detail-modal/purchase-orders-detail-modal.component';
import { PurchaseOrdersDetailFormComponent } from './purchase-orders-detail-form/purchase-orders-detail-form.component';

@NgModule({
  declarations: [
    PurchaseOrdersComponent,
    PurchaseOrdersListComponent,
    PurchaseOrdersFormComponent,
    PurchaseOrdersEditionFormComponent,
    PurchaseOrdersEditionModalComponent,
    PurchaseOrdersDetailModalComponent,
    PurchaseOrdersDetailFormComponent
  ],
  imports: [
    PurchaseOrdersRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    PurchaseOrdersEditionModalComponent
  ]
})
export class PurchaseOrdersModule { }
