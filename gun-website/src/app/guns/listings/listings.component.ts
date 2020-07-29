import { Component, OnInit } from '@angular/core';
import { GunsService } from 'src/app/shared/services/guns.service';
import { tap } from 'rxjs/operators';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {
  constructor(private _gunService: GunsService, private auth: AuthService) {}
  public guns$;

  ngOnInit() {
    this.guns$ = this._gunService
      .getGunsByOwner('1234')
      .pipe
      // tap((data) => {
      //   if (data.picture) {
      //     this.imgUrl = data.picture;
      //   }
      // })
      ();
  }
  calcTime(startDate: string) {
    const date1 = new Date(startDate).getTime();
    const date2 = new Date().getTime();
    const timeInbetween = (date2 - date1) / (1000 * 3600 * 24);
    return Math.round(timeInbetween);
  }
  deleteGun(id: string) {
    return this._gunService
      .deleteGunById(id)
      .pipe(
        tap(() => {
          location.reload();
        })
      )
      .subscribe();
  }
}
