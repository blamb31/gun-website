import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GunsService {
  constructor(private _http: HttpClient) {}

  getAllGuns() {
    return this._http.get('http://localhost:4001/guns/getGuns');
  }
}
