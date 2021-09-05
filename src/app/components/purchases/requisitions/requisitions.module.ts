import { NgModule } from '@angular/core';

// Modules
import { RequisitionsRoutingModule } from './requisitions-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { RequisitionsComponent } from './requisitions.component';
import { RequisitionsListComponent } from './requisitions-list/requisitions-list.component';
import { RequisitionsFormComponent } from './requisitions-form/requisitions-form.component';
import { RequisitionsEditionFormComponent } from './requisitions-edition-form/requisitions-edition-form.component';
import { RequisitionsEditionModalComponent } from './requisitions-edition-modal/requisitions-edition-modal.component';
import { RequisitionsDetailModalComponent } from './requisitions-detail-modal/requisitions-detail-modal.component';
import { RequisitionsDetailFormComponent } from './requisitions-detail-form/requisitions-detail-form.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    RequisitionsComponent,
    RequisitionsListComponent,
    RequisitionsFormComponent,
    RequisitionsEditionFormComponent,
    RequisitionsEditionModalComponent,
    RequisitionsDetailModalComponent,
    RequisitionsDetailFormComponent
  ],
  imports: [
    RequisitionsRoutingModule,
    NgxMaskModule.forRoot(),
    LayoutModule
  ],
  entryComponents: [
    RequisitionsEditionModalComponent
  ]
})
export class RequisitionsModule { }
