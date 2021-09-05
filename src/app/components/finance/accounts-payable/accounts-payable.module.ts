import { NgModule } from '@angular/core';

// Modules
import { AccountsPayableRoutingModule } from './accounts-payable-routing.module';
import { LayoutModule } from '@app/components/layout/layout.module';

// Components
import { AccountsPayableComponent } from './accounts-payable.component';
import { PurchaseOrdersReceivedComponent } from './purchase-orders-received/purchase-orders-received.component';
import { PurchaseOrdersReceivedListComponent } from './purchase-orders-received/purchase-orders-received-list/purchase-orders-received-list.component';
import { PurchaseOrdersReceivedFormComponent } from './purchase-orders-received/purchase-orders-received-form/purchase-orders-received-form.component';
import { PurchaseOrdersReceivedModalComponent } from './purchase-orders-received/purchase-orders-received-modal/purchase-orders-received-modal.component';
import { ImportPedimentsComponent } from './import-pediments/import-pediments.component';
import { ImportPedimentsListComponent } from './import-pediments/import-pediments-list/import-pediments-list.component';
import { ImportPedimentsFormComponent } from './import-pediments/import-pediments-form/import-pediments-form.component';
import { ImportPedimentsModalComponent } from './import-pediments/import-pediments-modal/import-pediments-modal.component';
import { PurchaseOrdersReceivedEditionModalComponent } from './purchase-orders-received/purchase-orders-received-edition-modal/purchase-orders-received-edition-modal.component';
import { PurchaseOrdersReceivedEditionFormComponent } from './purchase-orders-received/purchase-orders-received-edition-form/purchase-orders-received-edition-form.component';


@NgModule({
  declarations: [
    AccountsPayableComponent,
    PurchaseOrdersReceivedComponent,
    PurchaseOrdersReceivedListComponent,
    PurchaseOrdersReceivedFormComponent,
    PurchaseOrdersReceivedModalComponent,
    ImportPedimentsComponent,
    ImportPedimentsListComponent,
    ImportPedimentsFormComponent,
    ImportPedimentsModalComponent,
    PurchaseOrdersReceivedEditionModalComponent,
    PurchaseOrdersReceivedEditionFormComponent
  ],
  imports: [
    AccountsPayableRoutingModule,
    LayoutModule
  ]
})
export class AccountsPayableModule { }
