import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateFormComponent } from './exchange-rate-form/exchange-rate-form.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeRateComponent
  },
  {
    path: 'addExchangeRate',
    component: ExchangeRateFormComponent
  },
  {
    path: 'editExchangeRate/:id',
    component: ExchangeRateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateRoutingModule { }
