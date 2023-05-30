import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateFarmService {

  constructor(@Inject('CredentialsService') private _credentials: any) { }
  createFarm(data: { user: number, name: string, divipola: string, longitude: string, latitude: string, area: number, area_unit: number, tenure: number }) {
    return this._credentials.generateRequest(
      'post', 'page', 'apps/locations/',
      data,
      undefined, undefined, undefined, false
    ).pipe(
      map((res: any) => ({ ...res }))
    )
  }
}
