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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private api:Api) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const clonedRequest = request.clone();
    
    return next.handle(clonedRequest).pipe(
      catchError((error:HttpErrorResponse)=>{
        
        if(error.status!=401){
          return throwError(()=>error)
        }

        return from(this.api.refresh())
                    .pipe(
                      catchError((error:HttpErrorResponse)=>{
                        if(error.status==401){
                          // TODO redirect to login
                          console.log('User session expired')
                          return throwError(()=>error)
                        }
                        else{
                          //TODO show error
                          console.log('Something went wrong')
                          return throwError(()=>error)
                        }
                      }),
                      switchMap(() => 
                      next.handle(clonedRequest)
                      ))
      })
    );
  }

}
