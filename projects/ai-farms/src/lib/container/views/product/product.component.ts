import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ListProductService } from '../../../services/listProduct.service'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public size: 's' | 'm' | 'l' = 'l';
  public list_products: any;
  public buttonStates: { [key: string]: boolean } = {};
  public isRemoveButton = false;
  public productValue = this._forms.lookForm.get('product')?.value
  public removeButton = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/removebutton.png';
  public addButton = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/add.svg';
  public results = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 1,
        "name": "ARROZ SECANO",
        "image": "https://storage.googleapis.com/front-agrodatai-dev/agrodatai/products/Don-Tulio-Prices.svg",
        "product_id": 4,
        "crop_id": null,
        "subgroup_id": null
      },
      {
        "id": 2,
        "name": "Arroz",
        "image": "https://storage.googleapis.com/front-agrodatai-dev/agrodatai/products/Don-Tulio-Prices.svg",
        "product_id": null,
        "crop_id": 1,
        "subgroup_id": null
      }
    ]
  };
  public product: any[] = [{
    controlname: 'product', type: 'text', icon: 'lupa', label: '', placeholder: 'Ej: Maíz', errors: {
      pattern: 'Sólo letras',
      required: 'El campo es requerido'
    }
  }]
  constructor(public _forms: FormsService, public _listProducts: ListProductService) { }

  ngOnInit() {
    // this._forms.lookForm.get('product')?.valueChanges.subscribe(value => {
    //   this._forms.lookForm = value;
    //   this.productValue = value
    // });
  }
  public toggleButton(index: number): void {
    //this.isRemoveButton = !this.isRemoveButton;
    this.buttonStates[index] = !this.buttonStates[index];
  }
  public toggleButtonTwo(): void {
    this.isRemoveButton = !this.isRemoveButton;

  }
  search() {
    // this._listProducts.list('Arroz').subscribe({
    //   next: async (res: any) => {
    //     console.log(res)
    //   }
    // })

    this._listProducts.list('Arroz').subscribe(
      (response: any) => {
        this.results = response.results;
        console.log(response)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

