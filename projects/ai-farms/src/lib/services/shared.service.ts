import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public typeLocation: string = 'none';
  public typeLocationChange: Subject<void> = new Subject<void>();
  constructor(private _http: HttpClient) { }
  public changeMaps(): void {
    if (this.typeLocation === 'forms') this.typeLocation = 'maps';
    else if (this.typeLocation === 'none') this.typeLocation = 'maps';
    this.notifyTypeLocationChange();
  }
  public changeForms(): void {
    if (this.typeLocation === 'maps') this.typeLocation = 'forms';
    else if (this.typeLocation === 'none') this.typeLocation = 'forms';
    this.notifyTypeLocationChange();
  }
  private notifyTypeLocationChange(): void {
    this.typeLocationChange.next();
  }
}
