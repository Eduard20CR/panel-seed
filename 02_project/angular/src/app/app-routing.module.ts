import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'panel-generator',
    loadChildren: async () =>
      (await import('./project-modules/panels/panels.module'))
        .PanelsModule,
  },
  {
    path: '**',
    redirectTo: 'panel-generator',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
