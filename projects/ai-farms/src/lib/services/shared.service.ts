import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public getLocation: boolean = false;
  public typeLocationChange: Subject<boolean> = new Subject<boolean>();

  public sharedData: any;
  public userData: Subject<any> = new Subject<any>();


  constructor(private _http: HttpClient) { }
  public changeMaps(): void {
    if (this.getLocation === false) { this.getLocation = true; console.log("obtener ubicación"); }
    this.notifyTypeLocationChange();
  }

  public notifyTypeLocationChange(): void {
    this.typeLocationChange.next(this.getLocation);
  }
  // public setName(name: string) {
  //   this.place = name
  // }
  // public getName() {
  //   return this.place
  // }
  setSharedData(data: any) {
    this.sharedData = data;
    this.notifyUserData()
  }

  getSharedData() {
    this.notifyUserData()
    return this.sharedData;

  }
  public notifyUserData(): void {
    this.userData.next(this.sharedData);
  }
}
