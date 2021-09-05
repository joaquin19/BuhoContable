import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { ArticlesComponent } from './articles.component';
import { ArticlesFormComponent } from './articles-form/articles-form.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  },
  {
    path: 'addArticle',
    component: ArticlesFormComponent
  },
  {
    path: 'editArticle/:id',
    component: ArticlesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
