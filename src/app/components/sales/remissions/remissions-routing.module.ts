import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { RemissionsComponent } from './remissions.component';
import { RemissionsFormComponent } from './remissions-form/remissions-form.component';

const routes: Routes = [
  {
    path: '',
    component: RemissionsComponent
  },
  {
    path: 'addRemission',
    component: RemissionsFormComponent
  },
  {
    path: 'editRemission/:id',
    component: RemissionsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemissionsRoutingModule { }
