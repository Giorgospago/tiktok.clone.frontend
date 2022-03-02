import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import {ImgFallbackModule} from "ngx-img-fallback";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        ImgFallbackModule
    ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
