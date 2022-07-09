import { keyframes } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
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

    catchError((error : HttpErrorResponse) => {
    
      //If we get 401 it means the token is not valid or it expired
      
      if(error.error==401){
        //We try to refresh the token
        

      }else{
        this.router.navigate(['login']);
      }

      return throwError(() => error);
    }),

    );
  }
  
}
