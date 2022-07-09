import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../../util/validation'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl ('',[Validators.required,Validators.minLength(4)]),
    password_confirm : new FormControl('',[Validators.required,Validators.minLength(4)]),
    first_name: new FormControl('',Validators.required),
    last_name: new FormControl(''),
  },
  {
    validators:[Validation.match('password','password_confirm')]
  }
  );

  constructor() { }

  ngOnInit(): void {
  }


  signup(){

  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get first_name(){
    return this.signupForm.get('first_name');
  }

  get last_name(){
    return this.signupForm.get('last_name');
  }

  get password_confirm(){
    return this.signupForm.get('password_confirm');
  }

}
