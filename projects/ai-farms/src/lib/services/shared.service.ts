import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public getLocation: boolean = false;
  public typeLocationChange: Subject<boolean> = new Subject<boolean>();
  public place: any;

  constructor(private _http: HttpClient) { }
  public changeMaps(): void {
    if (this.getLocation === false) { this.getLocation = true; console.log("obtener ubicación"); }
    this.notifyTypeLocationChange();
  }

  public notifyTypeLocationChange(): void {
    this.typeLocationChange.next(this.getLocation);
  }
  public setName(name: string) {
    this.place = name
  }
  public getName() {
    return this.place
  }
}
