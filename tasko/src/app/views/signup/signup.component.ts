import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Api } from 'src/app/api/api';
import { User } from 'src/app/models/user';
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

  constructor(
    private api:Api,
    private toast:HotToastService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }


  signup(){

    if(!this.signupForm.valid ){
      return;
    }

    let user : User = {
      email:'',
      password:'',
      first_name:'',
      last_name:'',
    }

    user.email=this.signupForm.controls['email'].value ?? '';
    user.password=this.signupForm.controls['password'].value ?? '';
    user.first_name=this.signupForm.controls['first_name'].value ?? '';
    user.last_name=this.signupForm.controls['last_name'].value ?? '';

    this.api.signup(user).pipe(
      this.toast.observe({
        success:'Signed Up. You can now log in!',
        loading:'Creating Account...',
        error: 'Something Went Wrong. Try Again!'
      })
    ).subscribe(
      {
        next:()=>{

        },
        
        error: (error:HttpErrorResponse)=>{

          //500 = Possibly already existing user
          if(error.status==500)
          {
            this.toast.show(
              "Failed to Sign up. Does this user already exist?"
            )
          }

        },
        complete:()=>{
          this.router.navigate(['/login'])
        }
      }
    )

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
