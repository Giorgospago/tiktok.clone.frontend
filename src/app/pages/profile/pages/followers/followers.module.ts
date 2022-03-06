import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FollowersPageRoutingModule} from './followers-routing.module';

import {FollowersPage} from './followers.page';
import {ImgFallbackModule} from "ngx-img-fallback";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FollowersPageRoutingModule,
        ImgFallbackModule
    ],
    declarations: [FollowersPage]
})
export class FollowersPageModule {
}
