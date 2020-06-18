import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public personInfo$: Observable<any>;

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this.personInfo$ = this._auth.userProfile$.pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
  }
}
