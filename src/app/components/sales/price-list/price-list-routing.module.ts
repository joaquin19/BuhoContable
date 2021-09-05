import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PriceListFormComponent } from './price-list-form/price-list-form.component';
import { PriceListComponent } from './price-list.component';


const routes: Routes = [
  {
    path: '',
    component: PriceListComponent
  },
  {
    path: 'addPriceList',
    component: PriceListFormComponent
  },
  {
    path: 'editPriceList/:id',
    component: PriceListFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceListRoutingModule { }
