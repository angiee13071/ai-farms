import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { BeginComponent } from '../container/views/begin/begin.component';
import { ProductComponent } from '../container/views/product/product.component';
import { SummaryComponent } from '../container/views/summary/summary.component';
import { NewProductComponent } from './views/newProduct/newProduct.component'

const routes: Routes = [
  { path: '', component: BeginComponent, title: 'AgrodatAi - begin' },
  { path: 'begin', component: BeginComponent, title: 'AgrodatAi - begin' },
  { path: 'product', component: ProductComponent, title: 'AgrodatAi - product' },
  { path: 'new', component: NewProductComponent, title: 'AgrodatAi - new-product' },
  { path: 'summary', component: SummaryComponent, title: 'AgrodatAi - summary' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
