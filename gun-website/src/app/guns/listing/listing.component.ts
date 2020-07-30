import { Component, OnInit } from '@angular/core';
import { GunsService } from 'src/app/shared/services/guns.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  constructor(private _guns: GunsService, private _route: ActivatedRoute) {}
  gun$: Observable<any>;

  ngOnInit() {
    this.gun$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return (this.gun$ = this._guns.getGunById(params.id).pipe(
          tap((data) => {
            console.log({ data });
          })
        ));
      })
    );
  }

  formatPhone(phoneStr: string) {
    const phoneArr: string[] = phoneStr.split('');
    let formattedPhoneArr: string[] = [];
    // tslint:disable-next-line: forin
    for (const i in phoneArr) {
      if (i === '0') {
        formattedPhoneArr.push(`(${phoneArr[0]}`);
      } else if (i === '2') {
        formattedPhoneArr.push(`${phoneArr[i]}) `);
      } else if (i === '5') {
        formattedPhoneArr.push(`${phoneArr[i]}-`);
      } else {
        formattedPhoneArr.push(`${phoneArr[i]}`);
      }
    }
    let formattedPhone = formattedPhoneArr.join('');
    return formattedPhone;
  }
}
