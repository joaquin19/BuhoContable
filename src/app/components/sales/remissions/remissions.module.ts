import { NgModule } from '@angular/core';

// Modules
import { RemissionsRoutingModule } from './remissions-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components

import { RemissionsComponent } from './remissions.component';
import { RemissionsListComponent } from './remissions-list/remissions-list.component';
import { RemissionsFormComponent } from './remissions-form/remissions-form.component';
import { RemissionsModalComponent } from './remissions-modal/remissions-modal.component';
import { RemissionsDetailModalComponent } from './remissions-detail-modal/remissions-detail-modal.component';
import { RemissionsDetailFormComponent } from './remissions-detail-form/remissions-detail-form.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    RemissionsComponent,
    RemissionsListComponent,
    RemissionsFormComponent,
    RemissionsModalComponent,
    RemissionsDetailModalComponent,
    RemissionsDetailFormComponent
  ],
  imports: [
    RemissionsRoutingModule,
    NgxMaskModule.forRoot(),
    LayoutModule
  ],
  entryComponents: [
    RemissionsModalComponent,
    RemissionsDetailModalComponent
  ]
})
export class RemissionsModule { }
