import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlEndPoint = environment.base_url;
  private _token: string = '';

  constructor(private http: HttpClient) {}

  public get token(): string {
    if (this._token !== '') {
      return this._token;
    } else if (this._token == '' && sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return '';
  }

  // ===============================================================================================
  // ================================= SIGNIN USER =================================================
  signIn(user: User): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/login`, user);
  }

  // ===============================================================================================
  // ================================= SIGNUP USER =================================================
  signUp(user: User): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/users/create`, user);
  }

  // ===============================================================================================
  // ================================= LOGOUT USER =================================================
  logout(): void {
    sessionStorage.removeItem('token');
    this._token = '';
    this.isAuthenticated();
  }

  getPayload(accessToken: string): any {
    if (accessToken !== '') {
      return JSON.parse(atob(accessToken.split('.')[1]));
    } else return '';
  }

  isAuthenticated(): boolean {
    let payload = this.getPayload(this.token);
    if (payload !== '' && payload.uid) {
      return true;
    }
    return false;
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }
}
