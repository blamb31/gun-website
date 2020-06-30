import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TestServiceService } from '../shared/services/test-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public test: boolean;
  public date: any;

  constructor(
    private _auth: AuthService,
    private _testSvc: TestServiceService
  ) {}

  ngOnInit() {
    this._auth.userProfile$
      .pipe(
        tap((data) => {
          this.isLoggedIn = data;
        })
      )
      .subscribe();
    this._testSvc
      .getTest()
      .pipe(
        tap((data: any) => {
          console.log(data.testReturnObj[0].some_date);
          this.date = data.testReturnObj[0].some_date;
        })
      )
      .subscribe();
    // .pipe(tap((data) => console.log({ someTest: data })))
    // .subscribe();
  }

  logout() {
    this._auth.logout();
  }
}
