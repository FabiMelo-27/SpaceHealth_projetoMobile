import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SintomasDiariosPageRoutingModule } from './sintomas-diarios-routing.module';

import { SintomasDiariosPage } from './sintomas-diarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SintomasDiariosPageRoutingModule
  ],
  declarations: [SintomasDiariosPage]
})
export class SintomasDiariosPageModule {}
