import { NgModule } from '@angular/core';

// Modules
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { LayoutModule } from '../../layout/layout.module';

// Services

// Components
import { SuppliersComponent } from './suppliers.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersFormComponent } from './suppliers-form/suppliers-form.component';
import { SuppliersFinancialModalComponent } from './suppliers-financial-modal/suppliers-financial-modal.component';
import { SuppliersFinancialFormComponent } from './suppliers-financial-form/suppliers-financial-form.component';
import { SuppliersContactModalComponent } from './suppliers-contact-modal/suppliers-contact-modal.component';
import { SuppliersContactFormComponent } from './suppliers-contact-form/suppliers-contact-form.component';
import { SuppliersDetailModalComponent } from './suppliers-detail-modal/suppliers-detail-modal.component';
import { SuppliersDetailFormComponent } from './suppliers-detail-form/suppliers-detail-form.component';

@NgModule({
  declarations: [
    SuppliersComponent,
    SuppliersListComponent,
    SuppliersFormComponent,
    SuppliersFinancialModalComponent,
    SuppliersFinancialFormComponent,
    SuppliersContactModalComponent,
    SuppliersContactFormComponent,
    SuppliersDetailModalComponent,
    SuppliersDetailFormComponent
  ],
  imports: [
    SuppliersRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    SuppliersFinancialModalComponent
  ]
})
export class SuppliersModule { }
