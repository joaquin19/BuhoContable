import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { AccountsBanksFormComponent } from './accounts-banks-form/accounts-banks-form.component';
import { AccountsBanksComponent } from './accounts-banks.component';


const routes: Routes = [
  {
    path: '',
    component: AccountsBanksComponent
  },
  {
    path: 'addAccountsBanks',
    component: AccountsBanksFormComponent
  },
  {
    path: 'editAccountsBanks/:id',
    component: AccountsBanksFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsBanksRoutingModule { }
