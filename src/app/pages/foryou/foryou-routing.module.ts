import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForyouPage } from './foryou.page';

const routes: Routes = [
  {
    path: '',
    component: ForyouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForyouPageRoutingModule {}
