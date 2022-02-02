import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreatePage} from './create.page';
import {CreateGuard} from "../../guards/create.guard";

const routes: Routes = [
    {
        path: '',
        component: CreatePage
    },
    {
        path: 'details',
        canActivate: [CreateGuard],
        loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreatePageRoutingModule {
}
