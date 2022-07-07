import { Component, OnInit } from '@angular/core';

import {FormGroup,FormControl,Validators} from '@angular/forms'

import {User} from '../../models/user'

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

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    
  }

}