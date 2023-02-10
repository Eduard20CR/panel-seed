import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals.component';
import { Modal1Component } from './modal1/modal1.component';
import { Modal2Component } from './modal2/modal2.component';

@NgModule({
  declarations: [ModalsComponent, Modal1Component, Modal2Component],
  imports: [CommonModule],
  exports: [ModalsComponent],
})
export class ModalsModule {}
