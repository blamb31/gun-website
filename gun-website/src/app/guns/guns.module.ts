import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GunsRoutingModule } from './guns-routing.module';
import { GunsComponent } from './guns.component';
import { RouterModule } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { SearchComponent } from './search/search.component';
import { LikesComponent } from './likes/likes.component';

@NgModule({
  declarations: [
    GunsComponent,
    ListingsComponent,
    SearchComponent,
    LikesComponent,
  ],

  imports: [
    CommonModule,
    GunsRoutingModule,
    RouterModule.forChild([
      {
        path: 'search',
        children: [
          {
            path: '',
            component: SearchComponent,
          },
        ],
      },
      {
        path: 'listings',
        children: [
          {
            path: '',
            component: ListingsComponent,
          },
        ],
      },
      {
        path: 'likes',
        children: [
          {
            path: '',
            component: LikesComponent,
          },
        ],
      },
    ]),
  ],
})
export class GunsModule {}
