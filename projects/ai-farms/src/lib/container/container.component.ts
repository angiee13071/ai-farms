import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, of, takeUntil } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { AiNgSelect } from '@agrodatai/forms';
import { FormsService } from '../services/forms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {
  public size: 's' | 'm' | 'l' = 's';
  public location: any[] = [{ controlname: 'location', type: 'text', icon: 'map-mark', label: 'Ubicación Finca / Predio ', placeholder: 'Ej: Vereda El Rosal' }]
  public name: any[] = [{ controlname: 'name', type: 'text', icon: 'farm', label: 'Nombre de la finca (Opcional)', placeholder: 'Ej: Mi terruño' }]
  public area: any[] = [{ controlname: 'area', type: 'number', label: 'Área', placeholder: 'Ej: 7', radio: "10px 0px 0px 10px" }]
  public unit: AiNgSelect = {
    controlname: 'unit',
    options: [
      { default: true, label: ' Hectáreas', value: " Hectáreas" },
      { default: false, label: 'Metros', value: "Metros" },
      { default: false, label: 'Kilómetros', value: "Kilómetros" },
      { default: false, label: 'Acres', value: "Acres" },
      { default: false, label: 'Millas', value: "Millas+51" }
    ], type: 'select', error: false, label: 'Unidad', radio: "0px 10px 10px 0px",
    errors: { required: 'Completa este campo.' }
  }
  public property: AiNgSelect = {
    controlname: 'property',
    options: [
      { default: true, label: 'Propia', value: "Propia" },
      { default: false, label: 'Arrendada', value: "Arrendada" },
      { default: false, label: 'Alquilada', value: "Alquilada" },
      { default: false, label: 'Familiar', value: "Familiar" },
    ], type: 'select', error: false, label: 'La Finca / Predio es:',
    errors: { required: 'Completa este campo.' }
  }

  public src: string = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-manos-corazon.svg';
  public backgroundMaps = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/BackgroundMapsOne.png';
  public backgroundProducts = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/backgroundProductsWeb.png';
  //buttons
  public add_Farms: boolean = false;
  //Views
  public begin: boolean = false;
  public product: boolean = false;
  public summary: boolean = false;
  public finish: boolean = false;
  public isLoading = true;
  //of begin:
  public viewBegin: boolean = false;

  private $skip = new Subject<void>();
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

  private imageUrlsWeb: { paths: string[]; url: string }[] = [
    {
      paths: ['/', '/begin'],
      url: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-Asomado.svg',
    },
    {
      paths: ['/product'],
      url: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-manos-corazon.svg',
    },
    {
      paths: ['/', '/summary'],
      url: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-manos-corazon.svg',
    },
    {
      paths: ['/finish'],
      url: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-manos-corazon.svg',
    },

  ];
  miJSON: any = {}
  constructor(
    @Inject('commonService') public _common: any,
    private _router: Router, public _sharedService: SharedService,
    public _forms: FormsService
  ) {
    // window.addEventListener("load", (event) => {
    //   this.isLoading = false;
    // });
    // if (this.begin = true) {
    //   this.viewBegin = true;
    // }

  }

  ngOnInit() {
    this.alterImage(this._router.url)
    this._router.events.pipe(takeUntil(this.$skip)).subscribe((event) => {
      if (event instanceof NavigationEnd) this.alterImage(event.url);
    });

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.isLoading = false, 1000)
  }

  maps() {
    this._sharedService.changeMaps();
    console.log(this._sharedService.typeLocation)
  }
  forms() {
    this._sharedService.changeForms();
    console.log(this._sharedService.typeLocation)
  }
  private alterImage(path: string) {
    const tmp = this.imageUrlsWeb
      .filter((url: any) => url.paths.includes(`${path}`))
      .shift();
    if (tmp) this.src = tmp.url;
    path.includes(`/`) ? (this.begin = true) : (this.begin = false);
    path.includes('/begin') ? (this.begin = true) : (this.begin = false);
    path.includes('/product') ? (this.product = true) : (this.product = false);
    path.includes('/summary') ? (this.summary = true) : (this.summary = false);
  }

}
