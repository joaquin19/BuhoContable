import { NgModule } from '@angular/core';

// Modules
import { CustomersRoutingModule } from './customers-routing.module';
import { LayoutModule } from '../../layout/layout.module';

// Services

// Components

import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersDetailModalComponent } from './customers-detail-modal/customers-detail-modal.component';
import { CustomersDetailFormComponent } from './customers-detail-form/customers-detail-form.component';
import { CustomersFinancialModalComponent } from './customers-financial-modal/customers-financial-modal.component';
import { CustomersFinancialFormComponent } from './customers-financial-form/customers-financial-form.component';
import { CustomersContactModalComponent } from './customers-contact-modal/customers-contact-modal.component';
import { CustomersContactFormComponent } from './customers-contact-form/customers-contact-form.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomersListComponent,
    CustomersFormComponent,
    CustomersDetailModalComponent,
    CustomersDetailFormComponent,
    CustomersFinancialModalComponent,
    CustomersFinancialFormComponent,
    CustomersContactModalComponent,
    CustomersContactFormComponent
  ],
  imports: [
    CustomersRoutingModule,
    NgxMaskModule.forRoot(),
    LayoutModule
  ],
  entryComponents: [
    CustomersFinancialModalComponent
  ]
})
export class CustomersModule { }
