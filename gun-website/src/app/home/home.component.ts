import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this._auth.loggedIn;
  }

  checkLoggedIn() {
    this._auth.isAuthenticated$
      .pipe(tap((data) => console.log({ data })))
      .subscribe();
    // console.log('hi', this.isLoggedIn);
  }
  logout() {
    this._auth.logout();
  }
}
