import {HttpClient,HttpHeaders} from '@angular/common/http'
import {environment} from '../../environments/environment'

import {User} from '../models/user'
import {Observable} from 'rxjs'
import { response } from '../models/response';

export class Api {

    url:string = environment.apiUrl;
    loginPath:string = environment.loginPath

    constructor (private http:HttpClient) {}

    login(user:User) :Observable<response> {

        let fullPath = this.url+this.loginPath;
        return this.http.post<response>(fullPath,user)

    }

}