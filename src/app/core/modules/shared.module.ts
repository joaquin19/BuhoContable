import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { SyncfusionModule } from './syncfusion.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Directives
import { AutofocusDirective } from '@app/core/directives/autofocus.directive';
import { MatchPasswordDirective } from '@app/core/directives/match-password.directive';

// Components
import { ModalFormComponent } from '@app/core/components/modal-form/modal-form.component';
import { ModalAuthorizationFormComponent } from '@app/core/components/modal-authorization-form/modal-authorization-form.component';
import { ModalDetailFormComponent } from '@app/core/components/modal-detail-form/modal-detail-form.component';
import { AuditTrailFormComponent } from '@app/core/components/audit-trail-form/audit-trail-form.component';
import { BalanceMovementLogFormComponent } from '../components/balance-movement-log-form/balance-movement-log-form.component';

@NgModule({
  declarations: [
    ModalFormComponent,
    AutofocusDirective,
    ModalAuthorizationFormComponent,
    MatchPasswordDirective,
    ModalDetailFormComponent,
    AuditTrailFormComponent,
    BalanceMovementLogFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SyncfusionModule,
    NgbModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SyncfusionModule,
    NgbModule,
    NgxSpinnerModule,
    SweetAlert2Module,
    ModalFormComponent,
    AutofocusDirective,
    ModalAuthorizationFormComponent,
    MatchPasswordDirective,
    ModalDetailFormComponent,
    AuditTrailFormComponent,
    BalanceMovementLogFormComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class SharedModule { }
