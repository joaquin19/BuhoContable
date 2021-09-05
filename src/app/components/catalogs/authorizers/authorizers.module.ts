import { NgModule } from '@angular/core';

// Modules
import { AuthorizersRoutingModule } from './authorizers-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components

import { AuthorizersComponent } from './authorizers.component';
import { AuthorizersListComponent } from './authorizers-list/authorizers-list.component';
import { AuthorizersFormComponent } from './authorizers-form/authorizers-form.component';
import { AuthorizersModalComponent } from './authorizers-modal/authorizers-modal.component';
import { AuthorizersOrderFormComponent } from './authorizers-order-form/authorizers-order-form.component';
import { AuthorizersOrderModalComponent } from './authorizers-order-modal/authorizers-order-modal.component';

@NgModule({
  declarations: [
    AuthorizersComponent,
    AuthorizersListComponent,
    AuthorizersFormComponent,
    AuthorizersModalComponent,
    AuthorizersOrderFormComponent,
    AuthorizersOrderModalComponent
  ],
  imports: [
    AuthorizersRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    AuthorizersModalComponent,
    AuthorizersOrderModalComponent
  ]
})
export class AuthorizersModule { }
