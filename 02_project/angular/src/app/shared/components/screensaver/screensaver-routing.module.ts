import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreensaverComponent } from './screensaver.component';

const routes: Routes = [
  {
    path: '',
    component: ScreensaverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreensaverRoutingModule {}
