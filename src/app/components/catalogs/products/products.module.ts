import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { LayoutModule } from '../../layout/layout.module';
import { ProductsRoutingModule } from './products-routing.module';

// components
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { ProductsImportComponent } from './products-import/products-import.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsFormComponent,
    ProductsModalComponent,
    ProductsImportComponent
  ],
  imports: [
    ProductsRoutingModule,
    NgxMaskModule.forRoot(),
    LayoutModule
  ],
  entryComponents: [
    ProductsModalComponent
  ]
})
export class ProductsModule { }
