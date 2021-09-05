import { NgModule } from '@angular/core';

// Modules
import { UsersRoutingModule } from './users-routing.module';
import { LayoutModule } from '../../layout/layout.module';

// Services

// Components
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersModalComponent } from './users-modal/users-modal.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersFormComponent,
    UsersModalComponent
  ],
  imports: [
    UsersRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    UsersModalComponent
  ]
})
export class UsersModule { }
