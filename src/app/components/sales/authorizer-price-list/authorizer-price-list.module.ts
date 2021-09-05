import { NgModule } from '@angular/core';

import { AuthorizerPriceListDetailFormComponent } from './authorizer-price-list-detail-form/authorizer-price-list-detail-form.component';
import { AuthorizerPriceListDetailModalComponent } from './authorizer-price-list-detail-modal/authorizer-price-list-detail-modal.component';
import { AuthorizerPriceListListComponent } from './authorizer-price-list-list/authorizer-price-list-list.component';
import { AuthorizerPriceListModalComponent } from './authorizer-price-list-modal/authorizer-price-list-modal.component';
import { AuthorizerPriceListFormComponent } from './authorizer-price-list-form/authorizer-price-list-form.component';
import { LayoutModule } from '../../layout/layout.module';
import { AuthorizerPriceListRoutingModule } from './authorizer-price-list-routing.module';
import { AuthorizerPriceListComponent } from './authorizer-price-list.component';

@NgModule({
  declarations: [
    AuthorizerPriceListComponent,
    AuthorizerPriceListDetailFormComponent,
    AuthorizerPriceListDetailModalComponent,
    AuthorizerPriceListListComponent,
    AuthorizerPriceListModalComponent,
    AuthorizerPriceListFormComponent
  ],
  imports: [
    AuthorizerPriceListRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    AuthorizerPriceListModalComponent
  ]
})
export class AuthorizerPriceListModule { }
