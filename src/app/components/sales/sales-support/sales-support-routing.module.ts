import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesSupportComponent } from './sales-support.component';
import { SalesSupportFormComponent } from './sales-support-form/sales-support-form.component';

const routes: Routes = [
  {
    path: '',
    component: SalesSupportComponent
  },
  {
    path: 'addSalesSupport',
    component: SalesSupportFormComponent
  },
  {
    path: 'editSalesSupport/:id',
    component: SalesSupportFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesSupportRoutingModule { }
