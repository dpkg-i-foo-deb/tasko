import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';
import { Api } from '../api/api';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private cookieService: CookieService,
    private router: Router,
    private api: Api
  ) { }

  canActivate(): Observable<boolean> {

    //Check if the session cookie exists
    if (this.cookieService.check('active-session')) {

      //If it exists, check if it is true
      if (!(this.cookieService.get('active-session') == 'true')) {
        //Ping the API to check if the session either exists or if it is valid
        return this.api.ping().pipe(

          map(() => {
            this.cookieService.set('active-session', 'true')
            return true;
          }),

          catchError(() => {
            this.cookieService.set('active-session', 'false')
            this.router.navigate(['/login']);
            return of(false);
          })

        );
      } else {
        return of(true)
      }

    } else {
      return of(false)
    }

  }

}
