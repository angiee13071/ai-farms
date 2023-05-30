import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public typeLocation: string = 'none';
  public typeLocationChange: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient) { }
  public changeMaps(): void {
    if (this.typeLocation === 'forms') { this.typeLocation = 'maps'; console.log("se cambio de forms a maps"); }
    else if (this.typeLocation === 'none') { this.typeLocation = 'maps'; console.log("se cambio de none a maps") }
    this.notifyTypeLocationChange();
  }
  public changeForms(): void {
    if (this.typeLocation === 'maps') { this.typeLocation = 'forms'; console.log("se cambio de maps a forms") }
    else if (this.typeLocation === 'none') { this.typeLocation = 'forms'; console.log("se cambio de none a forms") }
    this.notifyTypeLocationChange();
  }
  public notifyTypeLocationChange(): void {
    this.typeLocationChange.next(this.typeLocation);
  }
}
