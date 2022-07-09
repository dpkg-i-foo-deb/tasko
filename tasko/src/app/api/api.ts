import {HttpClient,HttpHeaders} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {Injectable} from '@angular/core';

import {User} from '../models/user'
import {Observable} from 'rxjs'
import { LoginResponse } from '../models/response';
import { SignUpResponse } from '../models/response';

@Injectable({
    providedIn: 'root'
})

export class Api {

    url:string = environment.apiUrl;
    loginPath:string = environment.loginPath
    signupPath:string = environment.signupPath

    constructor (private http:HttpClient) {}

    login(user:User) :Observable<LoginResponse> {

        let fullPath = this.url+this.loginPath;

        return this.http.post<LoginResponse>(fullPath,user)

    }

    signup(user:User) : Observable<SignUpResponse>{
        let fullPath = this.url+this.signupPath;

        return this.http.post<SignUpResponse>(fullPath,user)
    }

}