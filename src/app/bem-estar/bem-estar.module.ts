import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BemEstarPageRoutingModule } from './bem-estar-routing.module';

import { BemEstarPage } from './bem-estar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BemEstarPageRoutingModule
  ],
  declarations: [BemEstarPage]
})
export class BemEstarPageModule {}
