import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { MapService } from '../../../services/map.service';
import { FormsService } from '../../../services/forms.service'
import { AiNgSelect } from '@agrodatai/forms';
@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

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

    this._sharedService.typeLocationChange.subscribe((typeLocation: string) => {

      if (typeLocation === 'maps') {
        setTimeout(() => {
          this._map.addMap(4.6492, -74.0628, 'map-maps');
        });

      } else if (typeLocation === 'forms') {
        setTimeout(() => {
          this._map.addMap(4.5709, -74.2973, 'map-forms');
        });
      }
    });
  }

  maps() {
    this._sharedService.changeMaps();
  }
  forms() {
    this._sharedService.changeForms();
  }

}



