import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { BeginComponent } from '../container/views/begin/begin.component';
import { FinishComponent } from '../container/views/finish/finish.component';
import { ProductComponent } from '../container/views/product/product.component';
import { SummaryComponent } from '../container/views/summary/summary.component';

const routes: Routes = [
  { path: '', component: BeginComponent },
  { path: 'begin', component: BeginComponent },
  { path: 'finish', component: FinishComponent },
  { path: 'product', component: ProductComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
