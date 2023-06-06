import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../services/forms.service';
import { ListProductService } from '../../../services/listProduct.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public buttonSearch = false;
  // public productsExist = false;
  public productsExist = true;
  public size: 's' | 'm' | 'l' = 'l';
  public list_products: any;
  public buttonStates: { [key: string]: boolean } = {};
  public isRemoveButton = false;
  public productValue = this._forms.lookForm.get('product')?.value
  public removeButton = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/removebutton.png';
  public addButton = 'https://storage.googleapis.com/front-agrodatai-dev/agrodatai/img/Material-Farms/add.svg';
  public results: any;
  public product: any[] = [{
    radio: "10px 0px 0px 10px",
    controlname: 'product', type: 'text', icon: 'lupa', label: '', placeholder: 'Ej: Maíz', errors: {
      pattern: 'El campo debe contener sólo letras.',
      required: 'El campo es requerido.'
    }
  }]
  constructor(public _forms: FormsService, public _listProducts: ListProductService, private _router: Router,) { }

  ngOnInit() {
    this.searchDefault();
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
    const product = this._forms.lookForm.controls["product"].value
    console.log(product)
    this.buttonSearch = true;
    this._listProducts.list(product).subscribe(
      (response: any) => {
        this.results = response.results;
        console.log("item:", this.results)
        if (this.results.length > 0 || this.results != null) {
          this.productsExist = true;
        } else {
          this.productsExist = false;
          this._router.navigate(['/add'])
          console.log("No hay productos")
        }
        console.log(this.productsExist)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  searchDefault() {
    this.buttonSearch = true;
    this._listProducts.listDefault().subscribe(
      (response: any) => {
        this.results = response.results;
        console.log("item:", this.results)
        if (this.results.length > 0 || this.results != null) {
          this.productsExist = true;
        } else {
          this.productsExist = false;
          console.log("No hay productos")
          this._router.navigate(['/add'])
        }
        console.log(this.productsExist)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

