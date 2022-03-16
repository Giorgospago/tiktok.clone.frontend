import {Component, OnInit} from '@angular/core';
import {mergeMapTo} from "rxjs";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {UsersService} from "../services/http/users.service";
import {AuthService} from "../services/http/auth.service";

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

    constructor(
        private afMessaging: AngularFireMessaging,
        private usersService: UsersService,
        private auth: AuthService
    ) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.requestPermission();
    }

    public requestPermission() {
        this.afMessaging
            .requestPermission
            .pipe(mergeMapTo(this.afMessaging.tokenChanges))
            .subscribe((token) => {
                this.auth.deviceToken = token;
                this.usersService.addDeviceToken(token).subscribe();
            });
    }
}
