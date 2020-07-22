import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ListingsComponent } from './listings/listings.component';
import { LikesComponent } from './likes/likes.component';
import { CreateListingComponent } from './create-listing/create-listing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/guns/search',
    pathMatch: 'full',
  },
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
    path: 'create-listing',
    children: [
      {
        path: '',
        component: CreateListingComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GunsRoutingModule {}
