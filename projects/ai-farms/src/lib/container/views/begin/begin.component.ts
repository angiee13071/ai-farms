import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { MapService } from '../../../services/map.service';
import { FormsService } from '../../../services/forms.service'
import { AiNgSelect } from '@agrodatai/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {
  private locationSubscription: Subscription | undefined;
  public lat: any;
  public long: any;
  public userData: any;
  images = [
    {
      src: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-Asomado.svg',
      alt: 'Imagen de Tulio'
    },
    {
      src: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Material-login-registro-web/Logo%20AgrodatAi.svg',
      alt: 'Imagen del logo de AgrodatAi'
    }
  ];


  constructor(
    @Inject('commonService') public _common: any,
    @Inject('UserService') public _user: any,
    public _sharedService: SharedService,
    public _map: MapService,
    public _forms: FormsService
  ) {

  }
  ngOnInit() {
    setTimeout(() => {
      this._map.addMap(4.60971, -74.08175, 'map-none');
    });

    this._user.getUser();
    this._user.user_firebase.subscribe((userData: any) => {
      this.userData = userData;
    });

    this._sharedService.typeLocationChange.subscribe((typeLocation: string) => {

      if (typeLocation === 'maps') {
        setTimeout(() => {
          this._map.addMap(this.lat, this.long, 'map-maps');
        });

      } else if (typeLocation === 'forms') {
        setTimeout(() => {
          this._map.addMap(4.60971, -74.08175, 'map-forms');
        });
      }
    });
  }
  latitude() {
    this.lat = this.userData.last_location.coords.latitude
    console.log(this.lat)
  }
  longitude() {
    this.long = this.userData.last_location.coords.longitude
    console.log(this.long)
  }

  maps() {
    this._user.getLocation();
    this.latitude();
    this.longitude();
    this._sharedService.changeMaps();
  }
  forms() {
    this._sharedService.changeForms();
  }

}



