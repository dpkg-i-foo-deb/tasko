import {HttpClient,HttpHeaders} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {Injectable} from '@angular/core';

import {User} from '../models/user'
import {Observable} from 'rxjs'
import { LoginResponse } from '../models/response';

@Injectable({
    providedIn: 'root'
})

export class Api {

    url:string = environment.apiUrl;
    loginPath:string = environment.loginPath

    constructor (private http:HttpClient) {}

    login(user:User) :Observable<LoginResponse> {

        let fullPath = this.url+this.loginPath;

        return this.http.post<LoginResponse>('http://localhost:3000/login',user)

    }

}