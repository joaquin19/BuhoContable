import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { BusinessFormComponent } from './business-form/business-form.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent
  },
  {
    path: 'addBusiness',
    component: BusinessFormComponent
  },
  {
    path: 'editBusiness/:id',
    component: BusinessFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
