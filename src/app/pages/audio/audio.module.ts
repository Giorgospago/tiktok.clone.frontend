import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioPageRoutingModule } from './audio-routing.module';

import { AudioPage } from './audio.page';
import {SafeModule} from "../../pipes/safe/safe.module";
import {VideoWallModule} from "../../components/video-wall/video-wall.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AudioPageRoutingModule,
        SafeModule,
        VideoWallModule
    ],
  declarations: [AudioPage]
})
export class AudioPageModule {}
