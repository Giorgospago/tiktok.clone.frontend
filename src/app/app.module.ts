import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {environment} from "../environments/environment";

const socketConfig: SocketIoConfig = {
    url: environment.api,
    options: {}
};

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios'
        }),
        AppRoutingModule,
        NgxWebstorageModule.forRoot({
            prefix: "tiktok"
        }),
        HttpClientModule,
        SocketIoModule.forRoot(socketConfig)
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
