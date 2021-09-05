import { NgModule } from '@angular/core';

// Modules
import { ArticlesRoutingModule } from './articles-routing.module';
import { LayoutModule } from '../../layout/layout.module';
// Services

// Components

import { ArticlesComponent } from './articles.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesFormComponent } from './articles-form/articles-form.component';
import { ArticlesModalComponent } from './articles-modal/articles-modal.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticlesFormComponent,
    ArticlesModalComponent
  ],
  imports: [
    ArticlesRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    ArticlesModalComponent
  ]
})
export class ArticlesModule { }
