import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {
  public src: string = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/Tulio-manos-corazon.svg';
  public title: boolean = false;
  public buttons: boolean = false;
  public box: boolean = false;
  public background: boolean = false;
  public boxSummary: boolean = false;
  public isLoading = true;
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
    private _router: Router,
  ) {
    window.addEventListener("load", (event) => {
      this.isLoading = false;
    });


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

  add() {

  }
  private alterImage(path: string) {
    const tmp = this.imageUrlsWeb
      .filter((url: any) => url.paths.includes(`${path}`))
      .shift();
    if (tmp) this.src = tmp.url;
    path.includes(`/`) ? (this.title = true) : (this.title = false);
    path.includes('/') ? (this.buttons = true) : (this.buttons = false);
    path.includes(`/begin`) ? (this.title = true) : (this.title = false);
    path.includes('/begin') ? (this.buttons = true) : (this.buttons = false);
    path.includes('/product') ? (this.box = true) : (this.box = false);
    path.includes('/product') ? (this.background = true) : (this.background = false);
    path.includes('/summary') ? (this.boxSummary = true) : (this.boxSummary = false);
  }

}
