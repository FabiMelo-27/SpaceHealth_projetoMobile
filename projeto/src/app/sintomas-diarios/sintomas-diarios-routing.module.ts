import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SintomasDiariosPage } from './sintomas-diarios.page';

const routes: Routes = [
  {
    path: '',
    component: SintomasDiariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SintomasDiariosPageRoutingModule {}
