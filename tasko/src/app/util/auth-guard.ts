import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError,map, Observable, of} from 'rxjs';
import { Api } from '../api/api';


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
      return true;
    }),

    catchError(err=>{

      this.router.navigate(['/login']);

      return of(false);
    })

    );
  }
  
}
