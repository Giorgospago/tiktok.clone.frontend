import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GumletPipe} from './gumlet.pipe';


@NgModule({
    declarations: [
        GumletPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GumletPipe
    ]
})
export class GumletModule {
}
