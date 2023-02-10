import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderImagesComponent } from './shared/components/preloader-images/preloader-images.component';
import { CursorManagerDirective } from './shared/directives/cursor-manager.directive';
import { TrackingDirective } from './shared/directives/tracking.directive';
import { GoToScreenSaverDirective } from './shared/directives/go-to-screen-saver.directive';
import { BackToHomeWhenReloadDirective } from './shared/directives/back-to-home-when-reload.directive';
import { TrackingLabelsModule } from './shared/components/tracking-labels-module/tracking-labels.module';
import { DetectActualPathDirective } from './shared/directives/detect-actual-path.directive';
import { IsiModule } from './shared/components/isi/isi.module';
import { ModalsModule } from './shared/components/modals/modals.module';

@NgModule({
  declarations: [
    AppComponent,
    CursorManagerDirective,
    TrackingDirective,
    GoToScreenSaverDirective,
    PreloaderImagesComponent,
    BackToHomeWhenReloadDirective,
    DetectActualPathDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrackingLabelsModule,
    IsiModule,
    ModalsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
