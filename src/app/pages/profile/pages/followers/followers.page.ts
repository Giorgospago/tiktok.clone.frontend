import {Component, OnInit} from '@angular/core';
import {UsersService} from 'src/app/services/http/users.service';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../../interfaces/IUser";

@Component({
    selector: 'app-followers',
    templateUrl: './followers.page.html',
    styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

    public paramsId: string;
    public users: IUser[] = [];

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
