import {Component, OnInit} from '@angular/core';
import {IUser} from 'src/app/interfaces/IUser';
import {UsersService} from 'src/app/services/http/users.service';
import {ActivatedRoute} from "@angular/router";
import {LocalStorage} from "ngx-webstorage";

@Component({
    selector: 'app-following',
    templateUrl: './following.page.html',
    styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

    @LocalStorage("user", {})
    public user: IUser;

    public paramsId: string;
    public users: IUser[] = [];
    public meId: string = "";

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.paramsId = params.id;
            this.getUsers();
        });
    }

    public getUsers() {
        this.usersService
            .userFollowing(this.paramsId)
            .subscribe(response => {
                if (response.success) {
                    this.users = response.data;
                }
            });
    }

    public unfollowFollowing(userId: string) {
        this.usersService.unfollowFollowing(userId)
            .subscribe(response => {
                if (response.success) {
                    this.getUsers();
                }
            });
    }
}
