import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, tap, catchError, throwError, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import Swal from 'sweetalert2';

import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MD5 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  public platformAccessToken: string | undefined;
  public timerToken = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private dbService: NgxIndexedDBService
  ) { }

  //Token platform
  getPlatformToken() {
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
      return this._http.post(`${environment.BACKEND_URL}auth/token/`, body.toString(), { headers }).pipe(
        tap((res: any) => {
          this.platformAccessToken = res.access_token;
        })
      )
    }
  }

  //User Token
  refreshToken(refresh_token: string) {
    return this._http.post(`${environment.BACKEND_URL}auth/refresh_token/`, { refresh_token }).toPromise()
      .catch(async error => {
        const query = 'revoke_previous=true';
        let errors = '';
        if (error.status === 400 && error?.error?.messages?.non_field_errors?.[0] ===
          "the refresh token is revoked") {
          errors = "El usuario está intentando accedes desde distintos dispositivos"
          return this._http.post(`${environment.BACKEND_URL}auth/refresh_token/${query}`,
            { refresh_token }).toPromise();
        } else {
          errors = "Error"
        }
        Swal.fire({ title: 'Error', text: errors, icon: 'warning', confirmButtonText: 'Continuar' });
        throw error;
      });
  }
  //Generador de peticiones
  //Se postula para controlar todas las peticiones y organizar tokens y urls

  public generateRequest(
    type: 'get' | 'post' | 'patch' | 'put' | 'delete',
    token: 'user' | 'page',
    url: string,
    data: any = {},
    query?: string,
    endpoint?: string,
    headers?: HttpHeaders,
    storage: boolean = true
  ) {
    if (url[url.length - 1] != '/') url += '/';
    let queryParams = new HttpParams();
    if (query) {
      query.split('&').forEach(function (value) {
        let aux = value.split('=');
        queryParams = queryParams.append(aux[0], aux[1]);
      });
    }
    if (!headers) headers = new HttpHeaders;

    if (storage) headers = headers.append('AgrodatAi-Storage', 'true');

    headers = headers.append('AgrodatAi-Token', token);

    const request = new HttpRequest(type.toUpperCase(), `${endpoint ? endpoint : environment.BACKEND_URL}${url}`, data, { params: queryParams, headers: headers });
    let key = MD5(JSON.stringify(request.body) + request.url).toString();

    return new Observable((observer) => {
      if (!storage) {
        this.Makerequest(request, observer);
      } else {
        this.dbService.getByKey('request', key).subscribe((data: any) => {
          if (data) {
            if (data.expires_in > Date.now()) {
              // console.log('generateRequest', data.body, key, request.body, request, request.url);
              observer.next(JSON.parse(data.body));
            } else {
              this.dbService.delete('request', key).subscribe((data) => { });
              data = undefined;
            }
          }
          if (!data) {
            this.Makerequest(request, observer);
          }
        });
      }
    });


  }

  private Makerequest(request: HttpRequest<any>, observer: Subscriber<unknown>) {
    this._http.request(request).pipe(
      catchError((err) => {
        observer.error(err);
        return throwError(err);
      })
    ).subscribe(
      event => {
        if (event.type === HttpEventType.DownloadProgress) {
          // console.log("Download progress event", event);
        }
        if (event.type === HttpEventType.UploadProgress) {
          // console.log("Upload progress event", event);
        }
        if (event.type === HttpEventType.Response) {
          // TODO validar los eventos response de error
          // console.log("response received...", event.body, event.status);
          observer.next(event.body);
        }
      });
  }
}
