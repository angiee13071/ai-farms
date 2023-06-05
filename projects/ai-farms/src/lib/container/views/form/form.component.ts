import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MapService } from '../../../services/map.service';
import { AiNgSelect } from '@agrodatai/forms';
import { FormsService } from '../../../services/forms.service';
import { CreateFarmService } from '../../../services/createFarm.service';
import { Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { UtilsService } from '@agrodatai/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public place: string = '';
  public sharedData: any;
  searchWord: string = '';
  searchOptions: string[] = [];

  public size: 's' | 'm' | 'l' = 's'; public location: any[] = [{ controlname: 'location', type: 'text', icon: 'map-mark', label: 'Ubicación Finca / Predio ', placeholder: 'Ej: Vereda El Rosal' }]
  public name: any[] = [{ controlname: 'name', type: 'text', icon: 'farm', label: 'Nombre de la finca (Opcional)', placeholder: 'Ej: Mi terruño' }]
  public area: any[] = [{ controlname: 'area', type: 'number', label: 'Área', placeholder: 'Ej: 7', radio: "10px 0px 0px 10px" }]
  public unit: AiNgSelect = {
    controlname: 'unit',
    options: [
      { default: true, label: ' Hectáreas', value: " Hectáreas" },
      { default: false, label: 'Metros', value: "Metros" },
      { default: false, label: 'Kilómetros', value: "Kilómetros" },
      { default: false, label: 'Acres', value: "Acres" },
      { default: false, label: 'Millas', value: "Millas+51" }
    ], type: 'select', error: false, label: 'Unidad', radio: "0px 10px 10px 0px",
    errors: { required: 'Completa este campo.' }
  }
  public property: AiNgSelect = {
    controlname: 'property',
    options: [
      { default: true, label: 'Propia', value: "Propia" },
      { default: false, label: 'Arrendada', value: "Arrendada" },
    ], type: 'select', error: false, label: 'La Finca / Predio es:',
    errors: { required: 'Completa este campo.' }
  }

  constructor(@Inject('commonService') public _common: any,
    @Inject('UserService') public _user: any,
    public _sharedService: SharedService,
    public _map: MapService,
    public _forms: FormsService, public _farms: CreateFarmService,
    private _utils: UtilsService,) { }

  ngOnInit() {
    // this.place = this._sharedService.getName();
    //this._forms.locationForm.get('location')?.setValue(this.place);
    this._forms.locationForm.controls["unit"].setValue("Héctareas");
    this._forms.locationForm.controls["property"].setValue("Propia")

    this._forms.locationForm.controls["location"].valueChanges.subscribe((value: any) => {
      this.getSearchOptions(value);
      console.log(value)
    });

  }

  ngOnDestroy() {

  }
  async createFarms() {
    const user = (await Preferences.get({ key: 'ai-firebase' })).value;
    if (user) {
      const decrypt = await this._utils.decrypt(user, environment.INDEXDB.SECRET_KEY);
      this.sharedData = decrypt
      console.log("datos encontrados en firebase", this.sharedData)
      const data = {
        user: decrypt.id ? decrypt.id : '397',
        name: this._forms.locationForm.controls["location"].value,
        divipola: '',
        longitude: decrypt.last_location.coords.longitude ? decrypt.last_location.coords.longitude : '-74',
        latitude: decrypt.last_location.coords.latitude ? decrypt.last_location.coords.latitude : '50',
        area: this._forms.locationForm.controls["area"].value,
        area_unit: this._forms.locationForm.controls["unit"].value,
        tenure: this._forms.locationForm.controls["property"].value,
      }
      console.log("data:", data)
      this._farms.createFarm(data);
    }
  }
  getSearchOptions(searchTerm: string) {
    this.searchOptions = this.search(searchTerm);
  }

  search(valor: string): string[] {
    this.searchOptions = ['bogota', 'soacha', 'cali', 'medellin', 'cucuta', 'caqueta'];
    return this.searchOptions.filter(opcion =>
      opcion.toLowerCase().includes(valor.toLowerCase())
    );

  }

  selectOption(option: string) {
    this._forms.locationForm.controls['location'].setValue(option);
    this.searchWord = option
    this.resetSearchOptions();
  }

  onLocationInput(value: string) {
    this._forms.locationForm.controls['location'].setValue(value);
    this.getSearchOptions(value);
  }

  resetSearchOptions() {
    this.searchOptions = [];
  }


}
