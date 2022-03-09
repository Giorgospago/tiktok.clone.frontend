import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatsService} from "../../../../services/http/chats.service";
import {IChat, IChatMessage} from "../../../../interfaces/IChat";
import {SocketsService} from "../../../../services/general/sockets.service";
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../../../interfaces/IUser";
import {IonContent} from "@ionic/angular";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    @ViewChild("ChatContent", {static: true})
    public ChatContent: IonContent;

    @LocalStorage("user")
    public user: IUser;

    public chatId: string;
    public chat: IChat;
    public messages: IChatMessage[] = [];
    public message: any = {
        text: ""
    };


    constructor(
        private route: ActivatedRoute,
        private chatsService: ChatsService,
        private ss: SocketsService
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
                    this.initSocket();
                }
            });

        this.chatsService.getChatMessages(this.chatId)
            .subscribe(response => {
                if (response.success) {
                    this.messages = response.data;
                    this.scrollToBottom(0);
                }
            });
    }

    public initSocket() {
        this.ss.socket
            .fromEvent(`chat:receive-message:${this.chat._id}`)
            .subscribe((msg: IChatMessage) => {
                this.messages.push(msg);
                this.scrollToBottom();
            });
    }


    public sendMessage() {
        this.ss.socket.emit("chat:send-message", {
            text: this.message.text,
            chat: this.chat._id,
            sender: this.user._id
        });

        this.message.text = "";
    }

    public scrollToBottom(duration: number = 300) {
        this.ChatContent.scrollToBottom(duration);
    }
}
