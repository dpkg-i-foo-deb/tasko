import { Component, OnInit } from '@angular/core';

import {FormGroup,FormControl,Validators} from '@angular/forms'

import {User} from '../../models/user'

import {Api} from '../../api/api'
import { UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl ('',Validators.required)
  })

  constructor(private api:Api) { }

  ngOnInit(): void {
  }

  login(){
    let user : User = {
      email:'',
      password:'',
    };

    if(this.loginForm.valid)
    {
      user.email=this.loginForm.controls['email'].value ?? '';
      user.password=this.loginForm.controls['password'].value ?? '';

      this.api.login(user).subscribe(data=>{
        console.log(data)
      })
    }

    
  }

}
