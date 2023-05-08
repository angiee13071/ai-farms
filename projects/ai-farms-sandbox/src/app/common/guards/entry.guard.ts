import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { CredentialsService } from '../services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class EntryGuard implements CanActivate {
  constructor(
    private _user: UserService,
    private _router: Router,
    private _credentials: CredentialsService
  ) { }

  canActivate = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    await this._user.getToken();
    console.log(this._user.token);
    if (this._user.token?.access_token) {
      if ((this._user.token?.generated + (this._user.token.expires_in * 1000)) > new Date().getTime()) {
        return true;
      } else {
        return new Promise<boolean>((resolve, reject) => {
          if (this._user.token) {
            this._credentials.generateRequest(
              'post',
              'user',
              'auth',
              'refresh_token/',
              { refresh_token: this._user.token.refresh_token },
            ).subscribe({
              next: async (res: any) => {
                if (this._user.token) {
                  this._user.token.access_token = String(res.access_token);
                  if (res.expired_in) this._user.token.expires_in = res.expired_in;
                  this._user.token.generated = new Date().getTime();
                  resolve(true);
                } else resolve(false)
              },
              error: (err: any) => {
                resolve(false);
              }
            });
          }
          else resolve(false)
        });
      }
    } else {
      this._router.navigate(['/'])
      return false;
    }
  }
}



