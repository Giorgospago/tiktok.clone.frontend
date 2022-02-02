import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfilePage} from './profile.page';

const routes: Routes = [
    {
        path: '',
        component: ProfilePage,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/mine/mine.module').then(m => m.MinePageModule)
            },
            {
                path: 'favorites',
                loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilePageRoutingModule {
}
