import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  constructor(private _http: HttpClient) {}

  getTest1() {
    return this._http.get('http://localhost:4000/test/test1');
  }
}
