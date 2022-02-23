import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MuteVideoDirective} from "./mute-video.directive";


@NgModule({
    declarations: [
        MuteVideoDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MuteVideoDirective
    ]
})
export class MuteVideoModule {
}
