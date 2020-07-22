import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GunsService {
  constructor(private _http: HttpClient) {}
  private baseUrl: string = 'http://localhost:4001';

  getAllGuns() {
    return this._http.get(`${this.baseUrl}/guns/getGuns`);
  }

  createGunListing(gunInfo: any) {
    return this._http.post(`${this.baseUrl}/guns/createGun`, gunInfo);
  }

  getGunsByOwner(ownerId: string) {
    return this._http.get(`${this.baseUrl}/guns/getGuns/${ownerId}`);
  }

  deleteGunById(gunId: string) {
    return this._http.delete(`${this.baseUrl}/guns/deleteGun/${gunId}`);
  }
}
