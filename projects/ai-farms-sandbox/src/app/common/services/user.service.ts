import { Injectable } from '@angular/core';
import User from '../interfaces/User';
import { UtilsService } from "@agrodatai/core";
import { environment } from '../../environments/environment';
import { Preferences } from '@capacitor/preferences';
import Token from '../interfaces/Token';
import { HttpClient } from '@angular/common/http';
import { CredentialsService } from './credentials.service';
import { AES, enc } from 'crypto-js';
import { BehaviorSubject, interval, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonService } from './common.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User | undefined;
  public user_firebase: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public token: Token | undefined;
  public user_fire_ref: any;
  private id_location: any;

  constructor(
    private _utils: UtilsService,
    private _http: HttpClient,
    private _credentials: CredentialsService,
    private _dbFire: AngularFirestore,
    private _common: CommonService,
    private _router: Router
  ) {

  }

  private setUser = async (user: User) => {
    await Preferences.set({ key: 'ai-user', value: this._utils.encrypt(user, environment.INDEXDB.SECRET_KEY) });
    this.user = user;
    console.log("user setuser", user)
    this.getUserFirebase();
    this.user_fire_ref.update({ last_connection: Date.now(), navigator: navigator.userAgent });
  }

  public getUser = async () => {
    const user = (await Preferences.get({ key: 'ai-user' })).value;
    if (user) {
      const decrypt = await this._utils.decrypt(user, environment.INDEXDB.SECRET_KEY);
      this.user = decrypt;
      console.log("user getuser", decrypt)
      this.getUserFirebase();
      this.user_fire_ref.update({ last_connection: Date.now(), navigator: navigator.userAgent });

    } else this.user = undefined;
  }

  public getUserFirebase() {
    this.user_fire_ref = this._dbFire.doc(`test_users/${this.user?.id}`);
    console.log("user_fire_ref", this.user?.id)
    this.user_fire_ref.snapshotChanges().pipe(
      map((a: any) => {
        const data = a.payload.data();
        if (data) {
          data['id'] = a.payload.id;
          return data;
        }
      })).subscribe((object: any) => {
        this.user_firebase.next(object);
      });
  }


  public updateCurrentUser = async (user: User | undefined) => {
    if (user) {
      await this.setUser(user);
      this.user = user;
    } else {
      await Preferences.remove({ key: 'ai-user' });
      await Preferences.remove({ key: 'ai-token' });
      this.user = undefined;
    };
  }

  public logOut = async () => {
    await this.updateCurrentUser(undefined);
    this._router.navigate(['/login']);
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
        'get', 'user', 'apps/user/details/'
      ).subscribe({
        next: (res: any) => {
          if (res) {
            this.updateCurrentUser(res);
            //TODO: Setear los modulos del usuario
          }
        },
        error: (err: any) => console.error(err)
      })
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      let that = this;
      let opts = { enableHighAccuracy: true, maximumAge: 60000, timeout: (environment.location_time * 1000) };
      const handleSuccess = async (position: any) => {
        if (position) {
          if (that.user_fire_ref) {
            that.user_fire_ref.update({
              last_location: {
                timestamp: position.timestamp,
                coords: {
                  accuracy: position.coords.accuracy,
                  altitude: position.coords.altitude,
                  altitudeAccuracy: position.coords.altitudeAccuracy,
                  heading: position.coords.heading,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  speed: position.coords.speed
                }
              }
            });
            console.log("getlocation", that.user_fire_ref.last_connection.coords)
          }
          // await Preferences.set({ key: 'tmpFireRef', value: this._utils.encrypt(that.user_fire_ref, environment.INDEXDB.SECRET_KEY) });

        }
      };
      const handleError = (error: any) => {
        console.error(`ERROR(${error.code}): ${error.message}`);
      };
      navigator.geolocation.getCurrentPosition(handleSuccess);
      this.id_location = navigator.geolocation.watchPosition(handleSuccess, handleError, opts);
      // navigator.geolocation.getCurrentPosition((position) => {

      // },
      // (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}


// – Create/Update a document:
// const tutRef = db.doc('tutorial');
// // set() for destructive updates
// tutRef.set({ title: 'zkoder Tutorial'});
// – Update a document:
// const tutRef= db.doc('tutorial');
// tutRef.update({ url: 'bezkoder.com/zkoder-tutorial' });
// – Delete a document:
// const tutRef = db.doc('tutorial');
// tutRef.delete();

// – Create a collection and add a new document:
// const tutorialsRef = db.collection('tutorials');
// const tutorial = { title: 'zkoder Tutorial', url: 'bezkoder.com/zkoder-tutorial' };
// tutorialsRef.add({ ...tutorial });
