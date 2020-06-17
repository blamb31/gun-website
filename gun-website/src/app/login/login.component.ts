import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestServiceService } from '../shared/services/test-service.service';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private testService: TestServiceService,
    private _http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    });

    this.testService
      .getTest1()
      .pipe(tap((data) => console.log({ data })))
      .subscribe();
  }

  login() {
    let test = this._auth.login();
    // this._http.post('http://localhost:4000/auth/login', {
    //   user,
    //   userLoggedIn,
    // });
    // this._auth.userProfile$
    //   .pipe(
    //     tap((userData) => (user = userData)),
    //     switchMap(() => {
    //       let userLoggedIn;
    //       this._auth.isAuthenticated$
    //         .pipe(tap((isLoggedIn) => (userLoggedIn = isLoggedIn)))
    //         .subscribe();
    //       return userLoggedIn;
    //     }),
    //     switchMap((userLoggedIn) => {
    //       let loggedInUser;
    //       this._http
    //         .post('http://localhost:4000/auth/login', {
    //           user,
    //           userLoggedIn,
    //         })
    //         .pipe(
    //           tap((returnedUser) => {
    //             localStorage.setItem('test1', JSON.stringify(returnedUser));
    //             console.log('hi', returnedUser);
    //             loggedInUser = returnedUser;
    //           })
    //         )
    //         .subscribe();
    //       return loggedInUser;
    //     })
    //   )
    // .subscribe();
    // this._auth.isAuthenticated$
    //   .pipe(tap((data) => (userLoggedIn = data)))
    //   .subscribe();
    // this._http
    //   .post('http://localhost:4000/auth/login', { user, userLoggedIn })
    //   .subscribe();
  }
}
