import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerRoutingModule } from './container.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BeginComponent } from './views/begin/begin.component';
import { ProductComponent } from './views/product/product.component';
import { NewProductComponent } from './views/newProduct/newProduct.component';
import { SummaryComponent } from './views/summary/summary.component';
import { FormComponent } from './views/form/form.component';

import { AngularFireModule } from '@angular/fire/compat';
import firebaseConfig from '../firebaseConfig';
import { AiFormsModule } from '@agrodatai/forms';
import { MapService } from '../services/map.service';
import { CreateFarmService } from '../services/createFarm.service';
import { FormsService } from '../services/forms.service';
import { ListProductService } from '../services/listProduct.service';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';
// Translations
import { AiSkeletonDirective, AiTranslatePipe } from '@agrodatai/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AiTranslateService } from '@agrodatai/core';
@NgModule({
  imports: [
    CommonModule,
    ContainerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AiFormsModule,
    FormsModule

  ],
  declarations: [
    ContainerComponent,
    BeginComponent,
    ProductComponent,
    NewProductComponent,
    SummaryComponent,
    FormComponent

  ],
  providers: [
    MapService,
    CreateFarmService,
    FormsService,
    ListProductService,
    SharedService
  ]
})
export class ContainerModule { }
