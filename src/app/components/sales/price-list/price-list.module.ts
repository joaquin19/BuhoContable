import { NgModule } from '@angular/core';

// Modules
import { PriceListRoutingModule } from './price-list-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { PriceListComponent } from './price-list.component';
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListDetailModalComponent } from './price-list-detail-modal/price-list-detail-modal.component';
import { PriceListDetailFormComponent } from './price-list-detail-form/price-list-detail-form.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    PriceListComponent,
    PriceListListComponent,
    PriceListFormComponent,
    PriceListDetailModalComponent,
    PriceListDetailFormComponent
  ],
  imports: [
    PriceListRoutingModule,
    NgxMaskModule.forRoot(),
    LayoutModule
  ]
})
export class PriceListModule { }
