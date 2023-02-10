import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicPagesRoutingModule } from './dynamic-pages-routing.module';
import { DynamicPagesComponent } from './dynamic-pages.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { GeneralButtonsComponent } from './buttons/general-buttons/general-buttons.component';

import { SlidesComponent } from './slides/slides.component';
import { Tab3Component } from './buttons/tab3/tab3.component';
import { Tab0Component } from './buttons/tab0/tab0.component';
import { Tab2Component } from './slides/tab2/tab2.component';

@NgModule({
  declarations: [
    DynamicPagesComponent,
    ButtonsComponent,
    GeneralButtonsComponent,
    SlidesComponent,
    Tab3Component,
    Tab0Component,
    Tab2Component,
  ],
  imports: [CommonModule, DynamicPagesRoutingModule],
})
export class DynamicPagesModule {}
