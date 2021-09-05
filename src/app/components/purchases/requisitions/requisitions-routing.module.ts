import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { RequisitionsComponent } from './requisitions.component';
import { RequisitionsFormComponent } from './requisitions-form/requisitions-form.component';

const routes: Routes = [
  {
    path: '',
    component: RequisitionsComponent
  },
  {
    path: 'addRequisition',
    component: RequisitionsFormComponent
  },
  {
    path: 'editRequisition/:id',
    component: RequisitionsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitionsRoutingModule { }
