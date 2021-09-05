import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchandiseReceptionComponent } from './merchandise-reception.component';
import { MerchandiseReceptionFormComponent } from './merchandise-reception-form/merchandise-reception-form.component';


const routes: Routes = [
  {
    path: '',
    component: MerchandiseReceptionComponent
  },
  {
    path: 'addMerchandiseReception',
    component: MerchandiseReceptionFormComponent
  },
  {
    path: 'editMerchandiseReception/:id',
    component: MerchandiseReceptionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchandiseReceptionRoutingModule { }
