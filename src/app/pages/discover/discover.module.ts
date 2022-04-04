import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import {ImgFallbackModule} from "ngx-img-fallback";
import {VideoWallModule} from "../../components/video-wall/video-wall.module";
import {SwiperModule} from "swiper/angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DiscoverPageRoutingModule,
        ImgFallbackModule,
        VideoWallModule,
        SwiperModule
    ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
