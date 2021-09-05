import { NgModule } from '@angular/core';
import { LayoutModule } from '../../layout/layout.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ProjectFormComponent,
    ProjectModalComponent
  ],
  imports: [
    ProjectsRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    ProjectModalComponent
  ]
})
export class ProjectsModule { }
