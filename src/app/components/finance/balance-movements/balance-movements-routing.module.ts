import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceMovementsFormComponent } from './balance-movements-form/balance-movements-form.component';
import { BalanceMovementsComponent } from './balance-movements.component';


const routes: Routes = [
  {
    path: '',
    component: BalanceMovementsComponent
  },
  {
    path: 'addBalanceMovement',
    component: BalanceMovementsFormComponent
  },
  {
    path: 'editBalanceMovement/:id',
    component: BalanceMovementsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceMovementsRoutingModule { }
