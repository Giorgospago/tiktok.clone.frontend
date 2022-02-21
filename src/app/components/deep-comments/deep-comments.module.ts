import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeepCommentsComponent} from "./deep-comments.component";


@NgModule({
    declarations: [
        DeepCommentsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DeepCommentsComponent
    ]
})
export class DeepCommentsModule {
}
