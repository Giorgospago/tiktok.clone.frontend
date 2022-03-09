import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {ImgFallbackModule} from "ngx-img-fallback";
import {FollowModule} from "../../components/follow/follow.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        ImgFallbackModule,
        FollowModule
    ],
    declarations: [ProfilePage]
})
export class ProfilePageModule {
}
