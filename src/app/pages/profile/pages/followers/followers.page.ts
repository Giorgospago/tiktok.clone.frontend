import {Component, OnInit} from '@angular/core';
import {UsersService} from 'src/app/services/http/users.service';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../../interfaces/IUser";
import {LocalStorage} from "ngx-webstorage";

@Component({
    selector: 'app-followers',
    templateUrl: './followers.page.html',
    styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

    @LocalStorage("user", {})
    public user: IUser;

    public paramsId: string;
    public users: IUser[] = [];
    public meId: string = "";

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.paramsId = params.id;
            this.initFollowers();
        });
    }

    private initFollowers() {
        this.usersService.userFollowers(this.paramsId)
            .subscribe(response => {
                if (response.success) {
                    this.users = response.data;
                }
            });
    }

    public unfollowFollowers(userId: string) {
        this.usersService.unfollowFollowers(userId)
            .subscribe();
    }
}
