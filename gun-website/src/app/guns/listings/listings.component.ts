import { Component, OnInit } from '@angular/core';
import { GunsService } from 'src/app/shared/services/guns.service';
import { tap } from 'rxjs/operators';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {
  constructor(private _gunService: GunsService, private _auth: AuthService) {}
  public guns: any;
  private email: any;
  public name: any = {
    first: '',
    last: '',
  };
  ngOnInit() {
    this._auth.userProfile$
      .pipe(
        tap((data: any) => {
          this.email = data.email;
          this.name.first = data.given_name;
          this.name.last = data.family_name;
          this.getGuns(data.email);
        })
      )
      .subscribe();
  }
  getGuns(ownerId: string) {
    this._gunService
      .getGunsByOwner(ownerId)
      .pipe(
        tap((data) => {
          this.guns = data;
        })
      )
      .subscribe();
  }
  calcTime(startDate: string) {
    const date1 = moment.utc(startDate);
    const today = moment.utc();
    // console.log(date1, today);
    // if (date1date === today) {
    //   return 0;
    // }

    const timeInbetween = today.diff(date1, 'days');

    return timeInbetween;
  }
  deleteGun(id: string) {
    return this._gunService
      .deleteGunById(id)
      .pipe(
        tap(() => {
          this.getGuns(this.email);
        })
      )
      .subscribe();
  }
}
