import { NgModule } from '@angular/core';
import { AiFarmsComponent } from './ai-farms.component';
import { ContainerModule } from '../lib/container/container.module'
import { HttpClientModule } from '@angular/common/http';
import { AiFarmsRoutingModule } from '../lib/ai-farms.routing'


@NgModule({
  declarations: [
    AiFarmsComponent
  ],
  imports: [
    AiFarmsRoutingModule,
    ContainerModule,
    HttpClientModule,
  ],
  exports: [
    AiFarmsComponent
  ]
})
export class AiFarmsModule { }
