import { NgModule } from '@angular/core';
import { SalesSupportListComponent } from './sales-support-list/sales-support-list.component';
import { SalesSupportFormComponent } from './sales-support-form/sales-support-form.component';
import { SalesSupportComponent } from './sales-support.component';
import { LayoutModule } from '../../layout/layout.module';
import { SalesSupportRoutingModule } from './sales-support-routing.module';
import { SalesSupportModalComponent } from './sales-support-modal/sales-support-modal.component';
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SalesSupportDetailModalComponent } from './sales-support-detail-modal/sales-support-detail-modal.component';
import { SalesSupportDetailFormComponent } from './sales-support-detail-form/sales-support-detail-form.component';

@NgModule({
  declarations: [
    SalesSupportComponent,
    SalesSupportListComponent,
    SalesSupportFormComponent,
    SalesSupportModalComponent,
    ListBoxComponent,
    SalesSupportDetailModalComponent,
    SalesSupportDetailFormComponent
  ],
  imports: [
    SalesSupportRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    SalesSupportModalComponent
  ]
})
export class SalesSupportModule { }
