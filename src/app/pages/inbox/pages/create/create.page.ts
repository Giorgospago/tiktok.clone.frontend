import {Component, OnInit} from '@angular/core';
import {ChatsService} from "../../../../services/http/chats.service";
import {IUser} from "../../../../interfaces/IUser";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    public users: IUser[] = [];

    constructor(
        private chatsService: ChatsService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.init();
    }

    public init() {
        this.chatsService.getUsersForChatting()
            .subscribe(response => {
                if (response.success) {
                    this.users = response.data;
                }
            });
    }

    public createChat(userId) {
        this.chatsService.create({
            users: [userId]
        }).subscribe((response) => {
            if (response.success) {
                this.router.navigate(['/inbox', response.data._id]);
            }
        });
    }
}
