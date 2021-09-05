import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@app/core/modules';

// Services
import { InterceptorService, DEFAULT_TIMEOUT } from '@app/core/services/interceptor.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActivateUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 3600000 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
