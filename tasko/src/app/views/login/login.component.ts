import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast'


import { FormGroup, FormControl, Validators } from '@angular/forms'

import { User } from '../../models/user'

import { Api } from '../../api/api'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(
    private api: Api,
    private toast: HotToastService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  login() {

    if (!this.loginForm.valid) {
      return;
    }

    let user: User = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    };

    user.email = this.loginForm.controls['email'].value ?? '';
    user.password = this.loginForm.controls['password'].value ?? '';

    this.api.login(user).pipe(
      this.toast.observe({
        success: 'Logged in Successfully!',
        loading: 'Logging in...',
        error: 'Something Went Wrong. Try Again!'
      })
    ).subscribe(
      {
        next: () => {
          //TODO what the heck do I do here?
        },

        error: (error: HttpErrorResponse) => {

          //401 = Username or password incorrect
          if (error.status == 401) {
            this.toast.show(
              "Username or Password Incorrect!",
            )
          }
          //Other stuff means backend is not running
          else {
            this.toast.show(
              "Cannot Connect to Backend! Is it Running?"
            ),
            {
              duration: 15,
              autoClose: false,
              dismissible: true,
            }
          }
        },

        complete: () => {

          //Create a session cookie
          this.cookieService.set('active-session', 'true')

          this.router.navigate(['/dashboard']);
        }
      }
    );

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
