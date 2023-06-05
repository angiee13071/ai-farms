import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public box: boolean = true;
  public finish: boolean = false;
  images = [
    {
      src: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-Asomado.svg',
      alt: 'Imagen de Tulio'
    },
    {
      src: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/tulio-celebrando.svg',
      alt: 'Imagen del logo de AgrodatAi'
    }
    ,
    {
      src: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Material-login-registro-web/Logo%20AgrodatAi.svg',
      alt: 'Imagen de Don Tulio'
    }
  ];

  fincas = [
    {
      nombre: 'Finca La Esperanza',
      productos: ['Café', 'Plátano', 'Maíz']
    },
    {
      nombre: 'Finca El Paraíso',
      productos: ['Cacao', 'Aguacate', 'Naranja']
    },
    {
      nombre: 'Finca San Juan',
      productos: ['Arroz', 'Yuca', 'Papaya']
    },

  ];
  constructor(private _router: Router, @Inject('commonService') public _common: any,) { }

  ngOnInit() {
  }
  yes() {
    this._router.navigate(["/product"]);
  }
  no() {
    this.box = false;
    this.finish = true;
  }
  exit() {
    this._router.navigate(["/home"]);
  }
}
