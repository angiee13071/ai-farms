import { Injectable } from '@angular/core';
import { UtilsService } from '@agrodatai/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { CredentialsService } from '../credentials.service';
import { environment } from '../../../environments/environment';
import { AiAlert } from '@agrodatai/alerts';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _user: UserService,
    private _credentials: CredentialsService,
    public _alerts: AiAlert,
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let endpoint: any = request.headers.get('AgrodatAi-Token');

    let token: any;
    if (endpoint == 'user')
      token = this._user.token?.access_token;
    else if (endpoint == 'page')
      token = this._credentials.platformAccessToken;

    if (request.url != `${environment.BACKEND_URL}auth/token/`) {
      let headers = request.headers.delete('AgrodatAi-Token');
      const modifiedRequest = request.clone({
        headers: headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(modifiedRequest).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this._alerts.readyAlert({
              type: 'error',
              image: 'explode_head',
              title: 'Error',
              text: 'Token inválido o expirado',
              timer: 3000, showConfirmButton: false
            })
            console.error(error);
            return this.handleUnauthorizedError();
          }
          // else if (error.status === 500 || error.status === 429) {
          //   this._alerts.readyAlert({
          //     type: 'error',
          //     image: 'explode_head',
          //     title: 'Error',
          //     text: 'Ha ocurrido un error, por favor inténtelo de nuevo más tarde',
          //     timer: 3000, showConfirmButton: false
          //   })

          // } 
          else {
            this._alerts.readyAlert({
              type: 'error',
              image: 'explode_head',
              title: 'Error',
              text: 'Ha ocurrido un error, por favor inténtelo de nuevo más tarde',
              timer: 3000, showConfirmButton: false
            })
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
