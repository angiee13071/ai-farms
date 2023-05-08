import { Injectable } from '@angular/core';
import User from '../interfaces/User';
import { UtilsService } from "@agrodatai/core";
import { Preferences } from '@capacitor/preferences';
import Token from '../interfaces/Token';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../app/environments/environment';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User | undefined;
  public token: Token | undefined;

  constructor(
    private _utils: UtilsService,
    private _credentials: CredentialsService,
    private _http: HttpClient
  ) {
    this.getUser();
    this.getToken();
  }

  private setUser = async (user: User) => {
    await Preferences.set({ key: 'ai-user', value: this._utils.encrypt(user, environment.INDEXDB.SECRET_KEY) });
    this.user = user;
  }
  public getUser = async () => {
    const user = (await Preferences.get({ key: 'ai-user' })).value;
    if (user) {
      const decrypt = await this._utils.decrypt(user, environment.INDEXDB.SECRET_KEY);
      this.user = decrypt.user
    }
  }

  public updateCurrentUser = async (user: User) => {
    if (user) {
      this.setUser(user);
      this.user = user;
    } else this.user = undefined;
  }

  public async setToken(token: Token | undefined) {
    await Preferences.set({ key: 'ai-token', value: this._utils.encrypt(token, environment.INDEXDB.SECRET_KEY) });
    this.token = token;
  }
  public getToken = async () => {
    const token = (await Preferences.get({ key: 'ai-token' })).value;
    if (token) {
      const decrypt = await this._utils.decrypt(token, environment.INDEXDB.SECRET_KEY);
      this.token = decrypt;
    } else this.token = undefined;
  }

  public getDetails = async () => {
    await this.getToken();
    if (this.token) {
      this._credentials.generateRequest(
        'get', 'user', 'apps', 'users/details/'
      ).subscribe({
        next: (res: any) => {
          if (res) {
            this.updateCurrentUser(res);
            //  this.user = res.modules;
          }
        },
        error: (err: any) => console.error(err)
      })
    }
  }
}
