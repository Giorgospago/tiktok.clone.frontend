import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioPageRoutingModule } from './audio-routing.module';

import { AudioPage } from './audio.page';
import {SafeModule} from "../../pipes/safe/safe.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AudioPageRoutingModule,
        SafeModule
    ],
  declarations: [AudioPage]
})
export class AudioPageModule {}
