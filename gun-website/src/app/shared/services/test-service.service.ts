import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  constructor(private _http: HttpClient) {}

  postTest() {
    return this._http
      .post('http://localhost:4001/test/testPost', {})
      .pipe(tap((data) => console.log(data)))
      .subscribe();
  }
  getTest() {
    return this._http
      .get('http://localhost:4001/test/testGet')
      .pipe(tap((data) => console.log(data)));
  }
}
