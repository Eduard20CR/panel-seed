import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPagesComponent } from './dynamic-pages.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicPagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicPagesRoutingModule {}
