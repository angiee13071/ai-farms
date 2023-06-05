import { AiAlert } from '@agrodatai/alerts';
import { AiSelectOption } from '@agrodatai/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public AgroLoader: boolean = true;
  public lang: string = 'es';
  public langSubject = new BehaviorSubject<string>('es');
  public connectionState: 'offline' | 'online' = 'online';
  public userAgent!: string;
  public countries: AiSelectOption[] = [
    { default: true, label: '+57', value: "+57", image: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Banderas-paises/colombia.png' },
    { default: false, label: '+54', value: "+54", image: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Banderas-paises/argentina.png' },
    { default: false, label: '+55', value: "+55", image: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Banderas-paises/brasil.png' },
    { default: false, label: '+56', value: "+56", image: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Banderas-paises/chile.png' },
    { default: false, label: '+51', value: "+51", image: 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Login-Registro/Banderas-paises/peru.png' }
  ]


  public device: 'web' | 'tablet' | 'mobile' = 'web';

  constructor(
    private _alerts: AiAlert
  ) { }

  public handleConnectionChange = () => {
    if (navigator.onLine) {
      this.connectionState = 'online';
      this._alerts.readyAlert({
        type: "success",
        image: "good",
        timer: 3000,
        title: "Se ha restablecido la conexión",
        text: "Continua navegando con comodidad"
      })
    }
    else {
      this.connectionState = 'offline';
      this._alerts.readyAlert({
        type: "warning",
        image: "rita",
        timer: 3000,
        title: "No tienes conexión a internet",
        text: "Algunas funciones no estarán disponibles"
      })
    }
  };
}

