import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatsService} from "../../../../services/http/chats.service";
import {IChat, IChatMessage} from "../../../../interfaces/IChat";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    public chatId: string;
    public chat: IChat;
    public messages: IChatMessage[] = [];


    constructor(
        private route: ActivatedRoute,
        private chatsService: ChatsService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.chatId = params.chatId;
            this.init();
        });
    }

    public init() {
        this.chatsService.getChat(this.chatId)
            .subscribe(response => {
                if (response.success) {
                    this.chat = response.data;
                }
            });

        this.chatsService.getChatMessages(this.chatId)
            .subscribe(response => {
                if (response.success) {
                    this.messages = response.data;
                }
            });
    }

}
