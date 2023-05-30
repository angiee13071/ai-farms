import { Inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@capacitor/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {


  constructor(@Inject('CredentialsService') private _credentials: any) { }
  list(product: string) {
    //Agregar el encabezado de autorización
    // return this._credentials.generateRequest('get', 'page', 'apps/products/register/?name=Arroz');
    return this._credentials.generateRequest(
      'get', 'user', 'apps/products/register/', 'name=Arroz',
      undefined, undefined, undefined, false
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
}
