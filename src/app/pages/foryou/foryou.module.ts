import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ForyouPageRoutingModule} from './foryou-routing.module';
import {ForyouPage} from './foryou.page';
import {SwiperModule} from 'swiper/angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ForyouPageRoutingModule,
        SwiperModule
    ],
    declarations: [ForyouPage]
})
export class ForyouPageModule {
}
