import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestServiceService } from '../shared/services/test-service.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

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
    private testService: TestServiceService
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
    console.log('hithit');
    this._auth.login();

    let test = this._auth.loggedIn;
    localStorage.setItem('loggedin', JSON.stringify(test));
  }
}
