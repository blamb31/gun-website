import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GunsRoutingModule } from './guns-routing.module';
import { GunsComponent } from './guns.component';
import { RouterModule } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { SearchComponent } from './search/search.component';
import { LikesComponent } from './likes/likes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateListingComponent } from './create-listing/create-listing.component';

@NgModule({
  declarations: [
    GunsComponent,
    ListingsComponent,
    SearchComponent,
    LikesComponent,
    CreateListingComponent,
  ],

  imports: [
    ReactiveFormsModule,
    CommonModule,
    GunsRoutingModule,
    RouterModule.forChild([]),
  ],
})
export class GunsModule {}
