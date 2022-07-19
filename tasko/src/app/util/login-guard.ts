import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //If there is an active session, there is no need to navigate to login
    if (this.cookieService.check('active-session')) {
      if (this.cookieService.get('active-session') == 'true') {
        this.router.navigate(['/dashboard'])
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

}
