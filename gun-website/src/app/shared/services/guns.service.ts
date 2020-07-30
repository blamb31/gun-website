import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GunsService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}
  private baseUrl: string = 'http://localhost:4001';

  getAllGuns() {
    return this._http.get(`${this.baseUrl}/guns/getAllGuns`);
  }
  getGunById(gunId: string) {
    return this._http.get(`${this.baseUrl}/guns/getGun/${gunId}`);
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

  updateGunById(gunId: string, gun: any) {
    return this._http.put(`${this.baseUrl}/guns/updateGun`, { gunId, gun });
  }
}
