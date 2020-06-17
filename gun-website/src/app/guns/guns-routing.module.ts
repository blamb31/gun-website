import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GunsComponent } from './guns.component';

const routes: Routes = [{ path: '', component: GunsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GunsRoutingModule { }
