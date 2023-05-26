import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public typeLocation: string = 'none';
  private formData: string = "";
  public access_token: string = '';
  public smsdata: boolean = false;
  constructor(private _http: HttpClient) { }
  public changeMaps(): void {
    if (this.typeLocation === 'forms') this.typeLocation = 'maps';
  }
  public changeForms(): void {
    if (this.typeLocation === 'maps') this.typeLocation = 'forms';
  }
  setFormData(data: any) {
    this.formData = data;
  }
  setAccessToken(token: string) {
    this.access_token = token;
  }
  getFormData() {
    const data = this.formData;
    return data;
  }
  getFormSms() {
    const data = this.smsdata;
    return data;
  }
  setFormSms(data: boolean) {
    this.smsdata = data;
  }
}
