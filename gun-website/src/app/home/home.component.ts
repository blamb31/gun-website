import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(private _auth: AuthService, private _http: HttpClient) {}

  ngOnInit() {
    this.isLoggedIn = this._auth.loggedIn;
  }

  checkLoggedIn() {
    // let isLoggedIn;
    // console.log('hi');
    // this._http
    //   .get('http://localhost:4000/auth/checkLoggedIn')
    //   .pipe(
    //     tap((data) => (isLoggedIn = data)),
    //     tap(() => console.log(isLoggedIn))
    //   )
    //   .subscribe();
    // console.log(isLoggedIn);
    // return isLoggedIn;
    this._auth.isAuthenticated$
      .pipe(tap((data) => console.log({ data })))
      .subscribe();
    this._auth.userProfile$
      .pipe(tap((data) => console.log({ data })))
      .subscribe();
  }
  logout() {
    this._auth.logout();
  }
}
