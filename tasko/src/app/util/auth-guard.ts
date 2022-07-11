import { keyframes } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, EMPTY, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { Api } from '../api/api';
import { PingResponse } from '../models/response'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor (
    private cookieService:CookieService, 
    private router:Router,
    private api:Api
    ){}

  shouldRedirect (cookieExists:boolean):any{
    if(!cookieExists)
    {
      this.router.navigate(['login']);
    }
  }

  canActivate () : Observable<boolean> {
    //Ping the API to check if the session either exists or if it is valid
    return this.api.ping().pipe(

      map(response => {
      if (!(response.response=="success")) {
        this.router.navigate(['login']);
        return false;
      } else {       
        return true;
      }
    }),

    catchError(err=>{
      this.router.navigate(['/login']);
      
      return of(false);
    })

    );
  }
  
}
