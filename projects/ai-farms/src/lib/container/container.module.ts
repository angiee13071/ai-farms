import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerRoutingModule } from './container.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BeginComponent } from './views/begin/begin.component';
import { FinishComponent } from './views/finish/finish.component';
import { ProductComponent } from './views/product/product.component';
import { SummaryComponent } from './views/summary/summary.component';
import { AngularFireModule } from '@angular/fire/compat';
import firebaseConfig from '../firebaseConfig';
import { AiFormsModule } from '@agrodatai/forms';
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

  ],
  declarations: [
    ContainerComponent,
    BeginComponent,
    FinishComponent,
    ProductComponent,
    SummaryComponent

  ],
  providers: [
  ]
})
export class ContainerModule { }
