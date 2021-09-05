import { NgModule } from '@angular/core';

// Modules
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '@app/core/modules';

// Components
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderContentComponent } from './header-content/header-content.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HeaderContentComponent,
    MenuComponent,
    LogoutComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [
    HeaderContentComponent,
    SharedModule
  ]
})
export class LayoutModule { }
