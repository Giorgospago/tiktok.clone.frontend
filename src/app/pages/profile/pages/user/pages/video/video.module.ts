import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';
import {MuteVideoModule} from "../../../../../../directives/mute-video/mute-video.module";
import {VideoWallModule} from "../../../../../../components/video-wall/video-wall.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VideoPageRoutingModule,
        MuteVideoModule,
        VideoWallModule
    ],
  declarations: [VideoPage]
})
export class VideoPageModule {}
