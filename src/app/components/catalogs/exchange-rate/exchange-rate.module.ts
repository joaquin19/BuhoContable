import { NgModule } from '@angular/core';

// Modules
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components

import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateListComponent } from './exchange-rate-list/exchange-rate-list.component';
import { ExchangeRateFormComponent } from './exchange-rate-form/exchange-rate-form.component';
import { ExchangeRateModalComponent } from './exchange-rate-modal/exchange-rate-modal.component';


@NgModule({
  declarations: [
    ExchangeRateComponent,
    ExchangeRateListComponent,
    ExchangeRateFormComponent,
    ExchangeRateModalComponent
  ],
  imports: [
    ExchangeRateRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    ExchangeRateModalComponent
  ]
})
export class ExchangeRateModule { }
