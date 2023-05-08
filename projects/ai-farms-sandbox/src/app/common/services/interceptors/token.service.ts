import { Injectable } from '@angular/core';
import { UtilsService } from '@agrodatai/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { CredentialsService } from '../credentials.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _utils: UtilsService,
    private _user: UserService,
    private _credentials: CredentialsService
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clearUrl = request.url.split('/').pop();
    const endpoint = clearUrl?.replace('?', '').split('&').shift()?.replace('token=', '');
    let token: any;
    if (endpoint == 'user')
      token = this._user.token?.access_token;
    else if (endpoint == 'page')
      token = this._credentials.platformAccessToken;
    console.log(this._credentials.platformAccessToken);
    if (request.url != `${environment.BACKEND_AUTH}token/`) {
      const modifiedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
        // url: request.url.replace('?token=user', '?').replace('?token=page', '?')
      });
      // Procesar la solicitud modificada y devolver la respuesta
      return next.handle(modifiedRequest).pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.log('Token inválido o expirado');
            return this.handleUnauthorizedError();
          } else {
            return throwError(error);
          }
        })
      )
    } else {
      return next.handle(request);
    }
  }

  private handleUnauthorizedError(): Observable<any> {
    return throwError('Token inválido o expirado');
  }

}
