import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public device: 'web' | 'tablet' | 'mobile' = 'web';

  constructor() { }

}
