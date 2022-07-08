import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';


import {FormGroup,FormControl,Validators} from '@angular/forms'

import {User} from '../../models/user'

import {Api} from '../../api/api'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl ('',[Validators.required,Validators.minLength(4)])
  })

  constructor(private api:Api) { }

  ngOnInit(): void {
  }

  login(){

    if (!this.loginForm.valid)
    {
      return
    }

    let user : User = {
      email:'',
      password:'',
    };

    user.email=this.loginForm.controls['email'].value ?? '';
    user.password=this.loginForm.controls['password'].value ?? '';

    this.api.login(user).subscribe(data=>{
      console.log(data)
    });
  
    
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
