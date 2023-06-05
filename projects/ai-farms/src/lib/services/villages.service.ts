import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VillagesService {

  constructor(@Inject('CredentialsService') private _credentials: any) { }
  villagesCoord(longitude: string, latitude: string) {
    return this._credentials.generateRequest(
      'get', 'user', 'apps/villages/details/', {}, `longitude=${longitude}&latitude=${latitude}`,
      undefined, undefined, true
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
  villagesName(name: string | null) {
    return this._credentials.generateRequest(
      'get', 'user', 'apps/villages/details/', {}, `name=${name}`,
      undefined, undefined, true
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
}
