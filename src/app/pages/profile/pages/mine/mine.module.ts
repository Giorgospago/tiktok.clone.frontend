import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MinePageRoutingModule} from './mine-routing.module';
import {MinePage} from './mine.page';
import {VideoWallModule} from "../../../../components/video-wall/video-wall.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MinePageRoutingModule,
        VideoWallModule
    ],
    declarations: [MinePage]
})
export class MinePageModule {
}
