import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerRoutingModule } from './container.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import firebaseConfig from '../firebaseConfig';

import { AiFormsModule } from '@agrodatai/forms';
import { GtagModule } from 'angular-gtag';
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
    GtagModule.forRoot({ trackingId: 'G-9WT5TH014N' }),
    AiSkeletonDirective,
    AiTranslatePipe,

  ],
  declarations: [
    ContainerComponent,

  ],
  providers: [
  ]
})
export class ContainerModule { }
