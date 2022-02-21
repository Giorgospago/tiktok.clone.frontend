import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
	{
		path: '',
		component: UserPage,
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/video/video.module').then(m => m.VideoPageModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserPageRoutingModule { }
