import { HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@capacitor/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {


  constructor(@Inject('CredentialsService') private _credentials: any) { }
  list(product: string) {
    return this._credentials.generateRequest(
      'get', 'user', 'apps/products/register/', {}, `name=${product}`,
      undefined, undefined, true
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
  listDefault() {
    return this._credentials.generateRequest(
      'get', 'user', 'apps/products/register/',
      undefined, undefined, undefined, undefined, true
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
}

