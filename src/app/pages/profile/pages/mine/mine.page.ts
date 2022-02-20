import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {LocalStorage} from "ngx-webstorage";
import { UsersService } from 'src/app/services/http/users.service';
import {IUser} from "../../../../interfaces/IUser";

@Component({
    selector: 'app-mine',
    templateUrl: './mine.page.html',
    styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

    @LocalStorage("user", {})
    public user: IUser;

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
    }
}
