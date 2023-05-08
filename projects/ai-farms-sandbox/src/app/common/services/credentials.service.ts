import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  public platformAccessToken: string | undefined;

  constructor(
    private _http: HttpClient,
  ) { }

  //Token platform
  getPlataformToken() {
    if (this.platformAccessToken) return of(this.platformAccessToken);
    else {
      const data = 'eHQ5R3lPRzNTNFJteWFvcXdWV2FvWXFkZ0tMaVZETnN2bGNoWkhBdjpYUGNVcENqUlc3TUxYQ3V2QTlmdzIwQUxQWkdNMk1vUE1RRGdIUVdKVzV0MjhCZGdDbjIwb29USTkzdnU5ZHNS';
      const body = new URLSearchParams();
      body.set('grant_type', 'client_credentials');
      body.set('scope', 'read write');
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + data,
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      return this._http.post(`${environment.BACKEND_AUTH}token/`, body.toString(), { headers }).pipe(
        tap((res: any) => {
          this.platformAccessToken = res.access_token;
        })
      )
    }
  }

  //User Token
  refreshToken(refresh_token: string) {
    return this._http.post(`${environment.BACKEND_AUTH}refresh_token/`, { refresh_token })
  }

  //Generador de peticiones
  //Se postula para controlar todas las peticiones y organizar tokens y urls

  public generateRequest(
    type: 'get' | 'post' | 'patch' | 'put' | 'delete',
    token: 'user' | 'page',
    prefix: 'apps' | 'auth',
    url: string,
    data?: any,
    id?: number | string,
    query?: string,
    headers?: HttpHeaders,
  ) {
    if (url[url.length - 1] != '/') url += '/';
    const queryFix = `?token=${token}${query ? '&' + query.replace('?', '') : ''}`
    const backend = prefix == 'apps' ? environment.BACKEND_APPS : prefix == 'auth' ? environment.BACKEND_AUTH : '';
    const idToSend = id || (data && data.id) ? id ? `${id}/` : `${data.id}/` : '';
    switch (type) {
      case 'get':
        return this._http.get(`${backend}${url}${queryFix}`, { headers });
      case 'post':
        return this._http.post(`${backend}${url}${queryFix}`, data, { headers });
      case 'patch':
        return this._http.patch(`${backend}${url}${idToSend ? idToSend : ''}${queryFix}`, data, { headers });
      case 'put':
        return this._http.put(`${backend}${url}${idToSend ? idToSend : ''}${queryFix}`, data, { headers });
      case 'delete':
        return this._http.get(`${backend}${url}${idToSend ? idToSend : ''}${queryFix}`, { headers });
    }
  }
}
