import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MinePageRoutingModule} from './mine-routing.module';
import {MinePage} from './mine.page';
import {MuteVideoModule} from "../../../../directives/mute-video/mute-video.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MinePageRoutingModule,
        MuteVideoModule
    ],
    declarations: [MinePage]
})
export class MinePageModule {
}
