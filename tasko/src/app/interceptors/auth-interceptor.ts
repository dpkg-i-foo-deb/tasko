import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { Api } from '../api/api';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private api: Api,
    private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const clonedRequest = request.clone();

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {


        //If we're trying to refresh the token, throw an error
        if (request.url.includes(environment.refreshPath)) {
          return throwError(() => error)
        }

        //TODO verify if the request includes login

        //If the status code is not 401, throw another error
        if (error.status != 401) {
          return throwError(() => error)
        }

        //The conditions above should guarantee the refresh token exists
        return from(this.api.refresh())
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status == 401) {
                console.log('User session expired or Invalid Credentials')
                //Set the session cookie to false
                this.cookieService.set('active-session', 'false')
                return throwError(() => error)
              }
              else {
                this.cookieService.set('active-session', 'false')
                console.log('Something went wrong')
                return throwError(() => error)
              }
            }),
            switchMap(() =>
              next.handle(clonedRequest)
            ))
      })
    );
  }
}
