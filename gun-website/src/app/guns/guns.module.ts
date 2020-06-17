import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GunsRoutingModule } from './guns-routing.module';
import { GunsComponent } from './guns.component';


@NgModule({
  declarations: [GunsComponent],
  imports: [
    CommonModule,
    GunsRoutingModule
  ]
})
export class GunsModule { }
