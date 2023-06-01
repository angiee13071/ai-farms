import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@capacitor/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveProductService {
  constructor(@Inject('CredentialsService') private _credentials: any) { }
  saveProduct(locations: number, products: number) {
    const data = {
      locations: locations,
      products: products
    }
    return this._credentials.generateRequest(
      'post', 'user', 'apps/locations_products/', data,
      undefined, undefined, undefined, false
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }


}
