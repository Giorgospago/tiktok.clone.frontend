import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeepCommentsComponent} from "./deep-comments.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
    declarations: [
        DeepCommentsComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        DeepCommentsComponent
    ]
})
export class DeepCommentsModule {
}
