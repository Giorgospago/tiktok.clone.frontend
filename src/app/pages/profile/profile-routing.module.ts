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
                loadChildren: () => import('./pages/mine/mine.module').then(m => m.MinePageModule),
            },
            {
                path: 'favorites',
                loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
            }
        ]
    },
    {
        path: ':id',
        loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule),
    },
    {
        path: ':id/followers',
        loadChildren: () => import('./pages/followers/followers.module').then( m => m.FollowersPageModule)
    },
    {
        path: ':id/following',
        loadChildren: () => import('./pages/following/following.module').then( m => m.FollowingPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilePageRoutingModule {
}
