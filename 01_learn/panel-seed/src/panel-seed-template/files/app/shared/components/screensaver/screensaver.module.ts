import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensaverRoutingModule } from './screensaver-routing.module';
import { ScreensaverComponent } from './screensaver.component';
import { ScreensaverMultipleSsModule } from './screensaver-multiple-ss/screensaver-multiple-ss.module';
import { ScreensaverOptionModule } from './screensaver-option/screensaver-option.module';

@NgModule({
  declarations: [ScreensaverComponent],
  imports: [
    CommonModule,
    ScreensaverRoutingModule,
    ScreensaverMultipleSsModule,
    ScreensaverOptionModule,
  ],
})
export class ScreensaverModule {}
