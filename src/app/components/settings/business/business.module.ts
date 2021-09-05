import { NgModule } from '@angular/core';
import { BusinessComponent } from './business.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessRoutingModule } from './business-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { BusinessFormDataComponent } from './business-form/business-form-data/business-form-data.component';
import { BusinessFormDomicileComponent } from './business-form/business-form-domicile/business-form-domicile.component';
import { BusinessFormInfoComponent } from './business-form/business-form-info/business-form-info.component';
import { BusinessFormRegimenComponent } from './business-form/business-form-regimen/business-form-regimen.component';
import { BusinessFormSelloComponent } from './business-form/business-form-sello/business-form-sello.component';



@NgModule({
  declarations: [
    BusinessComponent,
    BusinessFormComponent,
    BusinessListComponent,
    BusinessFormDataComponent,
    BusinessFormDomicileComponent,
    BusinessFormInfoComponent,
    BusinessFormRegimenComponent,
    BusinessFormSelloComponent
  ],
  imports: [
    BusinessRoutingModule,
    LayoutModule
  ]
})
export class BusinessModule { }
