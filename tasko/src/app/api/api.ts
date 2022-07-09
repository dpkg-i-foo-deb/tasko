import {HttpClient,HttpHeaders} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {Injectable} from '@angular/core';

import {User} from '../models/user'
import {Observable} from 'rxjs'
import { LoginResponse, PingResponse } from '../models/response';
import { SignUpResponse } from '../models/response';

@Injectable({
    providedIn: 'root'
})

export class Api {

    getCookieOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'}),
        withCredentials:true
    }

    pingOptions = {
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        }),
        withCredentials:true,
    }

    constructor (private http:HttpClient) {}

    login(user:User) :Observable<LoginResponse> {
        return this.http.post<LoginResponse>(environment.apiUrl+environment.loginPath,user,this.getCookieOptions)
    }

    signup(user:User) : Observable<SignUpResponse>{
        return this.http.post<SignUpResponse>(environment.apiUrl+environment.signupPath,user)
    }

    //Used to check if the access token either exists or is valid
    ping(): Observable<PingResponse> {
        return this.http.get<PingResponse>(environment.apiUrl+environment.pingPath,this.pingOptions)
    }

}