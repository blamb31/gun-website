import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { GunsService } from 'src/app/shared/services/guns.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss'],
})
export class CreateListingComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _gunService: GunsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}
  public createGunListingForm: FormGroup;
  public gunObj: any;
  public myGuns$: Observable<any>;
  public imgUrl: string =
    'https://imengine.prod.ltn.infomaker.io/?uuid=30D055D3-5D34-414F-96E1-ED8C26B4C34C&type=preview&function=original';

  ngOnInit() {
    this.createGunListingForm = this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      // first: ['', Validators.required],
      // last: ['', Validators.required],
    });
    this.myGuns$ = this._gunService.getGunsByOwner('1234').pipe(
      tap((data) => {
        if (data.picture) {
          this.imgUrl = data.picture;
        }
      })
    );
  }

  saveGunListing() {
    const { value } = this.createGunListingForm;
    this.gunObj = {
      name: value.name,
      dateAdded: moment.utc().format('MM-DD-YYYY'),
      location: {
        address: value.address,
        city: value.city,
        state: value.state,
        zip: value.zip,
      },
      tags: [],
      owner_Id: {
        id: '1234',
        first: 'Blake',
        last: 'Lamb',
      },
      price: value.price,
      picture:
        'https://images-na.ssl-images-amazon.com/images/I/51NqKMBzYpL._AC_SL1000_.jpg',
    };
    console.log(this.gunObj);
    this._gunService
      .createGunListing(this.gunObj)
      .pipe(
        tap(() => {
          this._router.navigateByUrl('/guns/listings');
        })
      )
      .subscribe();
  }
}
