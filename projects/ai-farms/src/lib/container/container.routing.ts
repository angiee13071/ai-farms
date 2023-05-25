import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { BeginComponent } from '../container/views/begin/begin.component';
import { FinishComponent } from '../container/views/finish/finish.component';
import { ProductComponent } from '../container/views/product/product.component';
import { SummaryComponent } from '../container/views/summary/summary.component';

const routes: Routes = [
  { path: '', component: BeginComponent, title: 'AgrodatAi - begin' },
  { path: 'begin', component: BeginComponent, title: 'AgrodatAi - begin' },
  { path: 'finish', component: FinishComponent, title: 'AgrodatAi - finish' },
  { path: 'product', component: ProductComponent, title: 'AgrodatAi - product' },
  { path: 'summary', component: SummaryComponent, title: 'AgrodatAi - summary' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
