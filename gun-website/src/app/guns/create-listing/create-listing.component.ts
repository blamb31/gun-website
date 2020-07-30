import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { GunsService } from 'src/app/shared/services/guns.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private _route: ActivatedRoute,
    private _auth: AuthService
  ) {}
  public createGunListingForm: FormGroup;
  public gunObj: any;
  public gunId: any;
  private email: string;
  public name: any = {
    first: '',
    last: '',
  };
  public myGuns$: Observable<any>;
  public imgUrl: string =
    'https://imengine.prod.ltn.infomaker.io/?uuid=30D055D3-5D34-414F-96E1-ED8C26B4C34C&type=preview&function=original';

  ngOnInit() {
    this._auth.userProfile$
      .pipe(
        tap((data: any) => console.log({ data })),
        tap((data: any) => {
          this.email = data.email;
          this.name.first = data.given_name;
          this.name.last = data.family_name;
          this.myGuns$ = this._gunService.getGunsByOwner(data.email);
        })
      )
      .subscribe();
    this._route.params
      .pipe(
        tap((params: Params) => {
          this.gunId = params.id;
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
          if (this.gunId) {
            this._gunService
              .getGunById(params.id)
              .pipe(
                tap((data: any) => {
                  this.createGunListingForm.patchValue({
                    name: data.name,
                    price: data.price.$numberDecimal,
                    address: data.location.address,
                    city: data.location.city,
                    state: data.location.state,
                    zip: data.location.zip,
                  });
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();
  }

  updateGunListing() {
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
        id: this.email,
        first: this.name.first,
        last: this.name.last,
      },
      price: value.price,
      picture: 'https://i.redd.it/pzr3ce4t54l21.jpg',
    };
    console.log({ id: this.gunId, gun: this.gunObj });
    this._gunService
      .updateGunById(this.gunId, this.gunObj)
      .pipe(
        tap(() => {
          this._router.navigateByUrl('/guns/listings');
        })
      )
      .subscribe();
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
        id: this.email,
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
