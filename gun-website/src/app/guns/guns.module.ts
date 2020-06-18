import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GunsRoutingModule } from './guns-routing.module';
import { GunsComponent } from './guns.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GunsComponent],

  imports: [
    CommonModule,
    GunsRoutingModule,
    RouterModule.forChild([
      {
        path: 'search',
        children: [
          {
            path: '',
            component: GunsComponent,
          },
        ],
      },
    ]),
  ],
})
export class GunsModule {}
