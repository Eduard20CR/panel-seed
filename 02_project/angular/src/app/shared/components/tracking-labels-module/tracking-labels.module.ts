import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrakingLabelsComponent } from './tracking-labels.component';
import { TrackingLabelsDirective } from '../../directives/tracking-labels.directive';

@NgModule({
  declarations: [
    TrakingLabelsComponent,
    TrackingLabelsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrakingLabelsComponent,
    TrackingLabelsDirective
  ]
})
export class TrackingLabelsModule { }
