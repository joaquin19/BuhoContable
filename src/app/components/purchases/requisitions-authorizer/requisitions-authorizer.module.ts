import { NgModule } from '@angular/core';

// Modules
import { RequisitionsAuthorizerRoutingModule } from './requisitions-authorizer-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components
import { RequisitionsAuthorizerComponent } from './requisitions-authorizer.component';
import { RequisitionsAuthorizerListComponent } from './requisitions-authorizer-list/requisitions-authorizer-list.component';
import { RequisitionsAuthorizerFormComponent } from './requisitions-authorizer-form/requisitions-authorizer-form.component';
import { RequisitionsAuthorizerModalComponent } from './requisitions-authorizer-modal/requisitions-authorizer-modal.component';
import { RequisitionsAuthorizerDetailModalComponent } from './requisitions-authorizer-detail-modal/requisitions-authorizer-detail-modal.component';
import { RequisitionsAuthorizerDetailFormComponent } from './requisitions-authorizer-detail-form/requisitions-authorizer-detail-form.component';

@NgModule({
  declarations: [
    RequisitionsAuthorizerComponent,
    RequisitionsAuthorizerListComponent,
    RequisitionsAuthorizerFormComponent,
    RequisitionsAuthorizerModalComponent,
    RequisitionsAuthorizerDetailModalComponent,
    RequisitionsAuthorizerDetailFormComponent
  ],
  imports: [
    RequisitionsAuthorizerRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    RequisitionsAuthorizerModalComponent
  ]
})
export class RequisitionsAuthorizerModule { }
