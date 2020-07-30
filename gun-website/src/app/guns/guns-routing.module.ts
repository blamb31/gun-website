import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ListingsComponent } from './listings/listings.component';
import { LikesComponent } from './likes/likes.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { ListingComponent } from './listing/listing.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'guns',
    redirectTo: '/guns/search',
    pathMatch: 'full',
  },
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
      {
        path: ':id',
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
  {
    path: 'listing',
    children: [
      {
        path: ':id',
        component: ListingComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GunsRoutingModule {}
