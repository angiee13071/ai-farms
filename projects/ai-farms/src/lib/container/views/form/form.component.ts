import { Component, Inject, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MapService } from '../../../services/map.service';
import { AiNgSelect } from '@agrodatai/forms';
import { FormsService } from '../../../services/forms.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public place: string = '';
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
      { default: false, label: 'Alquilada', value: "Alquilada" },
      { default: false, label: 'Familiar', value: "Familiar" },
    ], type: 'select', error: false, label: 'La Finca / Predio es:',
    errors: { required: 'Completa este campo.' }
  }

  constructor(@Inject('commonService') public _common: any,
    @Inject('UserService') public _user: any,
    public _sharedService: SharedService,
    public _map: MapService,
    public _forms: FormsService) { }

  ngOnInit() {
    this.place = this._sharedService.getName();
    this._forms.locationForm.get('location')?.setValue(this.place);
  }

}
