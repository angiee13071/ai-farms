import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, distinctUntilChanged, map } from 'rxjs';
import { patterns, checkAccessFormat } from '../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class FormsService {


  public locationForm: FormGroup;
  public lookForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

    this.locationForm = this.fb.group({
      location: ['', [Validators.required, Validators.pattern(patterns.only_letters)]],
      name: ['', [Validators.pattern(patterns.only_letters)]],
      area: ['', [Validators.required, Validators.pattern(patterns.only_numbers)]],
      unit: ['', [Validators.required]],
      property: ['', [Validators.required]],
    });

    this.lookForm = this.fb.group({
      product: ['', [Validators.required, Validators.pattern(patterns.only_letters)]]
    })

  }


}
