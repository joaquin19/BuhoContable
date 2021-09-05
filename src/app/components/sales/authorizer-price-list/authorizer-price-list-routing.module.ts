import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizerPriceListComponent } from './authorizer-price-list.component';
import { AuthorizerPriceListFormComponent } from './authorizer-price-list-form/authorizer-price-list-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizerPriceListComponent
  },
  {
    path: 'addAuthorizerPriceList',
    component: AuthorizerPriceListFormComponent
  },
  {
    path: 'editAuthorizerPriceList/:id',
    component: AuthorizerPriceListFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizerPriceListRoutingModule { }
