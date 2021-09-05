import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ProfilesComponent } from './profiles.component';
import { ProfilesFormComponent } from './profiles-form/profiles-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent
  },
  {
    path: 'addProfile',
    component: ProfilesFormComponent
  },
  {
    path: 'editProfile/:id',
    component: ProfilesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
