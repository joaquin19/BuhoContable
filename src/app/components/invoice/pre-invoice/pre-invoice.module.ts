import { NgModule } from '@angular/core';
import { PreInvoiceComponent } from './pre-invoice.component';
import { PreInvoiceListComponent } from './pre-invoice-list/pre-invoice-list.component';
import { PreInvoiceFormComponent } from './pre-invoice-form/pre-invoice-form.component';
import { PreInvoiceRoutingModule } from './pre-invoice-routing.module';
import { PreInvoiceDetailModalComponent } from './pre-invoice-detail-modal/pre-invoice-detail-modal.component';
import { PreInvoiceDetailFormComponent } from './pre-invoice-detail-form/pre-invoice-detail-form.component';
import { LayoutModule } from '../../layout/layout.module';



@NgModule({
  declarations: [
    PreInvoiceComponent,
    PreInvoiceListComponent,
    PreInvoiceFormComponent,
    PreInvoiceDetailModalComponent,
    PreInvoiceDetailFormComponent,
  ],
  imports: [
    PreInvoiceRoutingModule,
    LayoutModule
  ]
})
export class PreInvoiceModule { }
