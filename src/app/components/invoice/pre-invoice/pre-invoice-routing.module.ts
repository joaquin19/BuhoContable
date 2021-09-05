import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreInvoiceComponent } from './pre-invoice.component';
import { PreInvoiceFormComponent } from './pre-invoice-form/pre-invoice-form.component';

const routes: Routes = [
  {
    path: '',
    component: PreInvoiceComponent
  },
  {
    path: 'addPreInvoice',
    component: PreInvoiceFormComponent
  },
  {
    path: 'editPreInvoice/:id',
    component: PreInvoiceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreInvoiceRoutingModule { }
