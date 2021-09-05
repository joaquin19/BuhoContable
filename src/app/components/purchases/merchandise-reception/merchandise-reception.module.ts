import { NgModule } from '@angular/core';

// Modules
import { MerchandiseReceptionRoutingModule } from './merchandise-reception-routing.module';
import { LayoutModule } from '../../layout/layout.module';

// Services

// Components
import { MerchandiseReceptionComponent } from './merchandise-reception.component';
import { MerchandiseReceptionListComponent } from './merchandise-reception-list/merchandise-reception-list.component';
import { MerchandiseReceptionFormComponent } from './merchandise-reception-form/merchandise-reception-form.component';
import { MerchandiseReceptionEditionModalComponent } from './merchandise-reception-edition-modal/merchandise-reception-edition-modal.component';
import { MerchandiseReceptionEditionFormComponent } from './merchandise-reception-edition-form/merchandise-reception-edition-form.component';
import { MerchandiseReceptionDetailModalComponent } from './merchandise-reception-detail-modal/merchandise-reception-detail-modal.component';
import { MerchandiseReceptionDetailFormComponent } from './merchandise-reception-detail-form/merchandise-reception-detail-form.component';

@NgModule({
  declarations: [
    MerchandiseReceptionComponent,
    MerchandiseReceptionListComponent,
    MerchandiseReceptionFormComponent,
    MerchandiseReceptionEditionModalComponent,
    MerchandiseReceptionEditionFormComponent,
    MerchandiseReceptionDetailModalComponent,
    MerchandiseReceptionDetailFormComponent
  ],
  imports: [
    MerchandiseReceptionRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    MerchandiseReceptionEditionModalComponent
  ]
})
export class MerchandiseReceptionModule { }
