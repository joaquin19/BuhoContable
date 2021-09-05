import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { RequisitionsAuthorizerComponent } from './requisitions-authorizer.component';
import { RequisitionsAuthorizerFormComponent } from './requisitions-authorizer-form/requisitions-authorizer-form.component';

const routes: Routes = [
  {
    path: '',
    component: RequisitionsAuthorizerComponent
  },
  {
    path: 'addRequisitionsAuthorizer',
    component: RequisitionsAuthorizerFormComponent
  },
  {
    path: 'editRequisitionsAuthorizer/:id',
    component: RequisitionsAuthorizerFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitionsAuthorizerRoutingModule { }
