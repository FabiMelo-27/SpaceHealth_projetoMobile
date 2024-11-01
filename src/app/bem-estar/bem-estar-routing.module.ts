import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BemEstarPage } from './bem-estar.page';

const routes: Routes = [
  {
    path: '',
    component: BemEstarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BemEstarPageRoutingModule {}
