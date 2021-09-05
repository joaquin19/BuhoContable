import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { LoginUser } from '@app/core/models';
import { AlertMessageService } from './alert-message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private endpointLogin: string;
  private readonly JWT_TOKEN = 'TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER = 'USER';
  private loggedUser: LoginUser = null;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants,
    private alertMessageService: AlertMessageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.endpointLogin = this.endPoints.getApiLogin;
  }

  login(username: string, password: string) {
    const endpoint = this.settings.generateEndpoint(this.endpointLogin);

    return this.http.post<LoginUser>(`${endpoint}/authenticate`, { username, password })
      .pipe(
        tap(user => {
          if (user && user.token) {
            this.doLoginUser(user.token, user.refreshToken, user);
          }
          return user;
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    const endpoint = this.settings.generateEndpoint(this.endpointLogin);
    return this.http.get<LoginUser>(`${endpoint}/refreshToken?refreshToken=${this.getRefreshToken()}`)
      .pipe(
        tap(user => this.storeJwtToken(user.token, user.refreshToken))
      );
  }

  checkLoginStatus() {

    if (this.getJwtToken() === null || this.getJwtToken() === undefined) {
      return false;
    }

    const token = this.getJwtToken();
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return false;
    }

    const date = new Date(0);
    const tokenExpDate = date.setUTCSeconds(decoded.exp);

    if (tokenExpDate.valueOf() > new Date().valueOf()) {
      return true;
    }

    return false;
  }

  getJwtToken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(jwt: string, refreshToken: string, user: LoginUser) {
    this.loggedUser = user;
    this.storeTokens(jwt, refreshToken, user);
  }

  doLogoutUser(tokenExpired: boolean) {
    this.spinner.hide();
    this.modalService.dismissAll();
    this.loggedUser = null;
    this.removeTokens();
    if (tokenExpired) {
      this.alertMessageService.errorMessage(`La sesion ha expirado. <br> Favor de volver a loguearse.`);
    }
    this.router.navigate(['/login']);
  }

  private getRefreshToken() {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string, refreshToken: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
    sessionStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private storeTokens(jwt: string, refreshToken: string, user: LoginUser) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
    sessionStorage.setItem(this.REFRESH_TOKEN, refreshToken);
    sessionStorage.setItem(this.USER, JSON.stringify(user));
  }

  private removeTokens() {
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.removeItem(this.USER);
  }

  userProfile(): LoginUser {
    if (!this.loggedUser) {
      this.setLoginUser();
    }
    return this.loggedUser;
  }

  private setLoginUser(): void {
    const strLoginUser: string = sessionStorage.getItem(this.USER);
    const tmpLoginUser: LoginUser = this.convertJsonTo<LoginUser>(strLoginUser);
    if (tmpLoginUser) {
      this.loggedUser = tmpLoginUser;
    } else {
      console.warn('Exception at parsing User Login from sessionStore');
    }
  }

  private convertJsonTo<T>(obj: string): T {
    try {
      const tmpJson = JSON.parse(obj);
      return tmpJson as T;
    } catch (e) {
      console.warn('Exception at parsing object from sessionStore:', e);
    }
    return null;
  }

}
