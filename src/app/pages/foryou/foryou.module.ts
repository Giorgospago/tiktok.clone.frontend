import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ForyouPageRoutingModule} from './foryou-routing.module';
import {ForyouPage} from './foryou.page';
import {SwiperModule} from 'swiper/angular';
import {ImgFallbackModule} from "ngx-img-fallback";
import {CommentsPage} from "../comments/comments.page";
import {DeepCommentsModule} from "../../components/deep-comments/deep-comments.module";
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ForyouPageRoutingModule,
        SwiperModule,
        ImgFallbackModule,
        DeepCommentsModule
    ],
    declarations: [
        ForyouPage,
        CommentsPage
    ],
    providers: [
        SocialSharing
    ]
})
export class ForyouPageModule {
}
