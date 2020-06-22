import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public test: boolean;

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._auth.userProfile$
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
