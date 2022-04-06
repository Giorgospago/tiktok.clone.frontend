import {Component, Input, OnInit} from '@angular/core';
import {ChatsService} from "../../services/http/chats.service";
import {IUser} from "../../interfaces/IUser";
import {PostsService} from "../../services/http/posts.service";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-share',
    templateUrl: './share.page.html',
    styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

    public users: IUser[] = [];
    public selected = {};
    public message: string = "";

    @Input()
    public postId: string;

    constructor(
        private chatsService: ChatsService,
        private postsService: PostsService,
        private modalController: ModalController
    ) {
    }

    get selectedPeople() {
        const users = [];
        for (let userId in this.selected) {
            if (this.selected[userId]) {
                users.push(userId);
            }
        }
        return users;
    }

    ngOnInit() {
        this.chatsService.getUsersForChatting()
            .subscribe(response => {
                if (response.success) {
                    this.users = response.data;
                }
            });
    }

    public share() {
        for (let user of this.selectedPeople) {
            this.postsService.share({
                message: this.message,
                post: this.postId,
                receiver: user
            }).subscribe();
        }
        this.modalController.dismiss();
    }

}
