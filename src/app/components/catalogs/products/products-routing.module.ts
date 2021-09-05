import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { ProductsComponent } from './products.component';
import { ProductsFormComponent } from './products-form/products-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'addProduct',
    component: ProductsFormComponent
  },
  {
    path: 'editProduct/:id',
    component: ProductsFormComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule { }
