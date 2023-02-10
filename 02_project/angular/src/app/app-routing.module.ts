import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'screensaver',
    loadChildren: async () =>
      (await import('./shared/components/screensaver/screensaver.module'))
        .ScreensaverModule,
  },
  {
    path: ':id',
    loadChildren: async () =>
      (await import('./slides/slides.module')).SlidesModule,
  },
  {
    path: '**',
    redirectTo: 'tab-0',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
