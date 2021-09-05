import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SuppliersComponent } from './suppliers.component';
import { SuppliersFormComponent } from './suppliers-form/suppliers-form.component';

const routes: Routes = [
  {
    path: '',
    component: SuppliersComponent
  },
  {
    path: 'addSupplier',
    component: SuppliersFormComponent
  },
  {
    path: 'editSupplier/:id',
    component: SuppliersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuppliersRoutingModule { }
