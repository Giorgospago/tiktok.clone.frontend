import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CreatePageRoutingModule} from './create-routing.module';
import {CreatePage} from './create.page';
import {TimeagoModule} from "ngx-timeago";
import {MuteVideoModule} from "../../directives/mute-video/mute-video.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        TimeagoModule.forChild(),
        MuteVideoModule
    ],
    declarations: [CreatePage]
})
export class CreatePageModule {
}
