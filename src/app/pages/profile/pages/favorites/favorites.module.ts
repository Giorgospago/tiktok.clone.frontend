import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FavoritesPageRoutingModule} from './favorites-routing.module';
import {FavoritesPage} from './favorites.page';
import {VideoWallModule} from "../../../../components/video-wall/video-wall.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavoritesPageRoutingModule,
        VideoWallModule
    ],
    declarations: [FavoritesPage]
})
export class FavoritesPageModule {
}
