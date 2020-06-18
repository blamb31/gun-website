import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._auth.isAuthenticated$
      .pipe(
        tap((data) => {
          console.log(data);
          this.isLoggedIn = data;
        })
      )
      .subscribe();
  }

  logout() {
    this._auth.logout();
  }
}
