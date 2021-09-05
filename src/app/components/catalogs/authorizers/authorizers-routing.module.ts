import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthorizersComponent } from './authorizers.component';
import { AuthorizersFormComponent } from './authorizers-form/authorizers-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizersComponent
  },
  {
    path: 'addAuthorizer',
    component: AuthorizersFormComponent
  },
  {
    path: 'editAuthorizers/:id',
    component: AuthorizersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizersRoutingModule { }
