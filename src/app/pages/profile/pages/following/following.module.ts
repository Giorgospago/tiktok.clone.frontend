import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FollowingPageRoutingModule} from './following-routing.module';

import {FollowingPage} from './following.page';
import {ImgFallbackModule} from "ngx-img-fallback";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FollowingPageRoutingModule,
        ImgFallbackModule
    ],
    declarations: [FollowingPage]
})
export class FollowingPageModule {
}
