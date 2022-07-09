import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor (private cookieService:CookieService, private router:Router){}

  shouldRedirect (cookieExists:boolean):any{
    if(!cookieExists)
    {
      this.router.navigate(['login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //Step 1, verify is the access token exists
    const cookieExists = this.cookieService.check('access-token');

    //If it does not exist, redirect the user to the login page
    this.shouldRedirect(cookieExists)

    return cookieExists;
  }
  
}
