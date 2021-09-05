import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse,
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { timeout, catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { SessionService } from '@app/core/services';
import { AppResponse, LoginUser } from '@app/core/models';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private sessionService: SessionService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    const timeoutValue = Number(request.headers.get('timeout')) || this.defaultTimeout;

    request = this.addTokenToRequest(request, this.sessionService.getJwtToken());

    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((err as HttpErrorResponse).status) {
              case 0:
                console.log('HttpErrorResponse0', err);
                if ((new URL(err.url).pathname.indexOf('login/authenticate')) !== -1) {
                  return throwError({ status: err.status, message: 'No se puede conectar al servidor.' } as AppResponse);
                } else {
                  return this.sessionService.doLogoutUser(true) as any;
                }
              case 401:
                console.log('HttpErrorResponse401', err);
                if (err.error.message === undefined) {
                  return throwError({ status: err.status, message: err.error } as AppResponse);
                } else {
                  // return this.handle401Error(request, next);
                  return this.sessionService.doLogoutUser(true) as any;
                }
              case 400:
                console.log('HttpErrorResponse400', err);
                return this.sessionService.doLogoutUser(true) as any;
              case 500:
                console.log('HttpErrorResponse500', err);
                return throwError({ status: err.status, message: err.error } as AppResponse);
              default:
                console.log('HttpErrorResponseDefault', err);
                return throwError({ status: err.status, message: err.message } as AppResponse);
            }
          } else if (err.error instanceof ErrorEvent) {
            console.log('Client Side Error', err.error);
            return throwError({ status: err.status, message: err.error.message } as AppResponse);
          } else {
            console.log('Server Side Error', err);
            return throwError({ status: err.status, message: err.error.message } as AppResponse);
          }
        }),
        timeout(timeoutValue)
      );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token && this.sessionService.checkLoginStatus()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.sessionService.refreshToken()
        .pipe(
          switchMap((user: LoginUser) => {
            if (user) {
              this.tokenSubject.next(user.token);
              return next.handle(this.addTokenToRequest(request, user.token));
            }
            return this.sessionService.doLogoutUser(true) as any;
          }),
          catchError(err => {
            return this.sessionService.doLogoutUser(true) as any;
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }

}
