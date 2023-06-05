import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchMunicipalitiesService {
  constructor(@Inject('CredentialsService') private _credentials: any) { }
  municipalities(name: string | null) {
    return this._credentials.generateRequest(
      'get', 'user', 'apps/municipalities/', {}, `name=${name}`,
      undefined, undefined, true
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
}
