import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeepCommentsComponent} from "./deep-comments.component";
import {IonicModule} from "@ionic/angular";
import {ImgFallbackModule} from "ngx-img-fallback";


@NgModule({
    declarations: [
        DeepCommentsComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ImgFallbackModule
    ],
    exports: [
        DeepCommentsComponent
    ]
})
export class DeepCommentsModule {
}
