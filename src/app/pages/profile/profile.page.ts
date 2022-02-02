import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {AuthService} from "../../services/http/auth.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    @LocalStorage("user", {})
    public user: IUser;

    public segment: string = "";

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                if (val.url === "/profile") { val.url += "/"; }
                this.segment = val.url.replace("/profile/", "");
            }
        });
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(["/"]);
    }

    public segmentChanged(event) {
        const url = `/profile/${event.detail.value}`;
        this.router.navigate([url]);
    }
}
