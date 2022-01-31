import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {AuthService} from "../../services/http/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    @LocalStorage("user", {})
    public user: IUser;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(["/"]);
    }
}
