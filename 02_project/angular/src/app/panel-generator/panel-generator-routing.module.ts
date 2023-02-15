import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelFormComponent } from './panel-form/panel-form.component';
import { PanelGeneratorComponent } from './panel-generator.component';

const routes: Routes = [
{
  path: '',
  component: PanelFormComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelGeneratorRoutingModule { }
