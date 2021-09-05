import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersComponent } from './customers.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'addCustomer',
    component: CustomersFormComponent
  },
  {
    path: 'editCustomer/:id',
    component: CustomersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
