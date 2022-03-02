import {Component, OnInit} from '@angular/core';
import {ChatsService} from "../../services/http/chats.service";
import {IChat} from "../../interfaces/IChat";

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.page.html',
    styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

    public chats: IChat[] = [];

    constructor(
        private chatsService: ChatsService
    ) {}

    ngOnInit() {
        this.initChats();
    }

    public initChats() {
        this.chatsService.getChats()
            .subscribe(response => {
                if (response.success) {
                    this.chats = response.data;
                }
            });
    }

    doRefresh(event) {
        this.initChats();
        event.target.complete();
    }

}
