import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'foryou',
                canActivate: [AuthGuard],
                loadChildren: () => import('../pages/foryou/foryou.module').then( m => m.ForyouPageModule)
            },
            {
                path: 'discover',
                canActivate: [AuthGuard],
                loadChildren: () => import('../pages/discover/discover.module').then( m => m.DiscoverPageModule)
            },
            {
                path: 'create',
                canActivate: [AuthGuard],
                loadChildren: () => import('../pages/create/create.module').then( m => m.CreatePageModule)
            },
            {
                path: 'inbox',
                canActivate: [AuthGuard],
                loadChildren: () => import('../pages/inbox/inbox.module').then( m => m.InboxPageModule)
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule)
            },
            {
                path: '',
                redirectTo: '/foryou',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
