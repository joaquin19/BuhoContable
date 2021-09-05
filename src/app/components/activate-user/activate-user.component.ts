import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectSettings } from '@app/core/constants';
import { AlertMessageService, SessionService, UserSystemService } from '@app/core/services';
import { LoginUser } from '@app/core/models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  @ViewChild('activateForm', { static: true })
  public activateForm: NgForm;

  public validateUser: any;
  public submitted: boolean;
  public titleHeader: string;
  public messageHerader: string;
  public infoVersion: string;
  public developedBy: string;
  public fieldTextTypeNewPassword: boolean;
  public fieldTextTypeConfirmNewPassword: boolean;
  public currentUser: LoginUser;

  constructor(
    private alertMessageService: AlertMessageService,
    private settings: ProjectSettings,
    private sessionService: SessionService,
    private userSystemService: UserSystemService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.validateUser = {
      newPassword: '',
      confirmNewPassword: ''
    };
    this.submitted = false;
    this.titleHeader = '';
    this.infoVersion = this.settings.infoVersion();
    this.developedBy = this.settings.developedBy();
    this.fieldTextTypeNewPassword = false;
    this.fieldTextTypeConfirmNewPassword = false;
    this.currentUser = this.sessionService.userProfile();
  }

  ngOnInit(): void {
    if (this.sessionService.userProfile().active) {
      this.router.navigate(['/']);
    }

    this.titleHeader = `Activar Usuario: ${this.currentUser.fullName}`;
    this.messageHerader = `Para activar su usuario es necesario ingresar una nueva contraseña.`
  }

  toggleFieldTextTypeNewPassword() {
    this.fieldTextTypeNewPassword = !this.fieldTextTypeNewPassword;
  }

  toggleFieldTextTypeConfirmNewPassword() {
    this.fieldTextTypeConfirmNewPassword = !this.fieldTextTypeConfirmNewPassword;
  }

  logout() {
    this.currentUser = new LoginUser();
    this.sessionService.doLogoutUser(false);
  }

  saveForm() {
    this.submitted = true;

    if (this.activateForm.invalid) {
      return;
    }

    if (this.validations()) {
      const userSystemActiveSave: any = {};
      userSystemActiveSave.email = this.currentUser.email;
      userSystemActiveSave.password = this.validateUser.newPassword.trim();
      userSystemActiveSave.createBy = this.currentUser.userName;

      this.spinner.show();
      this.userSystemService.updateActiveUserSystem(userSystemActiveSave).subscribe(
        data => {
          this.sessionService.login(data.userName, userSystemActiveSave.password).subscribe(
            user => {
              this.router.navigate(['/']);
              this.spinner.hide();
            },
            error => {
              this.alertMessageService.errorMessage(error.message);
            });
        },
        error => {
          this.alertMessageService.errorMessage(error.message);
        });
    }

  }

  validations() {

    if (this.validateUser.newPassword.trim() === '') {
      this.alertMessageService.warningMessage('Nueva contraseña es requerida.');
      return false;
    }

    if (this.validateUser.confirmNewPassword.trim() === '') {
      this.alertMessageService.warningMessage('Confirmar contraseña es requerida.');
      return false;
    }

    if (this.validateUser.confirmNewPassword.trim() !== this.validateUser.newPassword.trim()) {
      this.alertMessageService.warningMessage('Las contraseñas no coinciden.');
      return false;
    }

    return true;
  }

}
