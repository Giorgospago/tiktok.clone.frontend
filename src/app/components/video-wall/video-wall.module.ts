import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideoWallComponent} from "./video-wall.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {GumletModule} from "../../pipes/gumlet/gumlet.module";

@NgModule({
    declarations: [
        VideoWallComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        GumletModule
    ],
    exports: [
        VideoWallComponent
    ]
})
export class VideoWallModule {
}
