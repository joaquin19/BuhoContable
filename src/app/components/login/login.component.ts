import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessageService, SessionService } from '@app/core/services';
import { ProjectSettings } from '@app/core/constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', { static: true })
  public loginForm: NgForm;

  public infoVersion: string;
  public applicationName: string;
  public developedBy: string;
  public submitted: boolean;
  public returnUrl: string;
  public user: any = {
    userName: '',
    password: ''
  };

  constructor(
    private alertMessageService: AlertMessageService,
    private sessionService: SessionService,
    private settings: ProjectSettings,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.infoVersion = this.settings.infoVersion();
    this.applicationName = this.settings.applicationName();
    this.developedBy = this.settings.developedBy();
    this.submitted = false;

    this.user = {
      userName: '',
      password: ''
    };

    document.body.className = 'gradientBody';
  }

  ngOnInit(): void {
    if (this.sessionService.isLoggedIn) {
      this.router.navigate(['/']);
    }

    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  login() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show();
    this.sessionService.login(this.user.userName.trim(), this.user.password.trim()).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        document.body.removeAttribute('class');
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

}
