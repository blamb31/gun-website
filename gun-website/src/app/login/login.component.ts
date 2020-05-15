import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestServiceService } from '../shared/services/test-service.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private testService: TestServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    });

    let test = this.testService
      .getTest1()
      .pipe(tap((data) => console.log({ data })))
      .subscribe();
  }

  login() {
    console.log(this.loginForm.value.email, this.loginForm.value.password);
    this._router.navigateByUrl('/');
  }
}
