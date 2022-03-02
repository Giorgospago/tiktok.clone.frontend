import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InboxPage} from './inbox.page';

const routes: Routes = [
    {
        path: '',
        component: InboxPage
    },
    {
        path: 'create',
        loadChildren: () => import('./pages/create/create.module').then(m => m.CreatePageModule)
    },
    {
        path: ':chatId',
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InboxPageRoutingModule {
}
