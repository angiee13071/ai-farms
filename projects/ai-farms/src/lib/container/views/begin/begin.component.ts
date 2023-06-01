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
  public lat: any;
  public long: any;
  public userData: any;
  public getPlace: boolean = false;

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
      this._map.addMap(4.60971, -74.08175, 'mapDefault');
    });
    this._user.getUser();
    this._user.user_firebase.subscribe((userData: any) => {
      this.userData = userData;
      console.log("datauserbegin:", userData)
    });

    // this._sharedService.typeLocationChange.subscribe((getLocation: boolean) => {

    //   if (getLocation === true) {
    //     setTimeout(() => {
    //       this._map.addMap(this.lat, this.long, 'map');
    //     });

    //   }
    // });
    // if (this.getPlace === true) {
    //   setTimeout(() => {
    //     this._map.addMap(this.userData.last_location.coords.latitude,this.userData.last_location.coords.longitude, 'map');
    //   });
    // } else if (this.getPlace === false) {


    // }
  }


  mapsWeb() {
    this._user.getLocation();
    this.getPlace = true;
    this.lat = this.userData.last_location.coords.latitude;
    this.long = this.userData.last_location.coords.longitude;
    //this._sharedService.changeMaps();
    setTimeout(() => {
      this._map.addMap(this.lat, this.long, 'map');
    });
    this.getLocationName();
  }

  getLocationName() {
    this._map.getLocation(this.lat, this.long)
      .subscribe(
        (placeName: string) => {
          this._sharedService.setName(placeName)
          console.log('Lugar:', placeName);
        },
        (error: any) => {
          console.error('Error al obtener el nombre del lugar:', error);
        }
      );
  }

}



