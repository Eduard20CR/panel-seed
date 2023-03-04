import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelsRoutingModule } from './panels-routing.module';
import { PanelFormComponent } from './panel-form/panel-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PanelFormComponent
  ],
  imports: [
    CommonModule,
    PanelsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PanelsModule { }
