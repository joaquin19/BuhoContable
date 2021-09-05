import { NgModule } from '@angular/core';

// Modules
import { ProfilesRoutingModule } from './profiles-routing.module';
import { LayoutModule } from '../../layout/layout.module';

// Services

// Components
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ProfilesFormComponent } from './profiles-form/profiles-form.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesListComponent,
    ProfilesFormComponent
  ],
  imports: [
    ProfilesRoutingModule,
    LayoutModule
  ]
})
export class ProfilesModule { }
