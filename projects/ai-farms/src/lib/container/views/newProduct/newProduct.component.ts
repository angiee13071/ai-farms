import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-newProduct',
  templateUrl: './newProduct.component.html',
  styleUrls: ['./newProduct.component.scss']
})
export class NewProductComponent implements OnInit {
  public isRemoveButton = false;
  public removeButton = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/removebutton.png';
  public addButton = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/add.svg';
  public image = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/tulio-pensativo.svg'
  constructor(@Inject('commonService') public _common: any,) { }

  ngOnInit() {
  }
  public toggleButtonTwo(): void {
    this.isRemoveButton = !this.isRemoveButton;

  }
}
