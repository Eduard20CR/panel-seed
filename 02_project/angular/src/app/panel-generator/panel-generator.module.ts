import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelGeneratorRoutingModule } from './panel-generator-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelFormComponent } from './panel-form/panel-form.component';


@NgModule({
  declarations: [
    PanelFormComponent
  ],
  imports: [
    CommonModule,
    PanelGeneratorRoutingModule,
    ReactiveFormsModule
  ]
})
export class PanelGeneratorModule { }
