import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../../interfaces/IReponse";
import {environment} from "../../../environments/environment";
import {IChat, IChatMessage} from "../../interfaces/IChat";
import {IUser} from "../../interfaces/IUser";

@Injectable({
    providedIn: "root"
})
export class ChatsService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getChats() {
        return this.http.get<IResponse<IChat[]>>(environment.api + `/chats`);
    }

    public getChat(chatId: string) {
        return this.http.get<IResponse<IChat>>(environment.api + `/chats/${chatId}`);
    }

    public getChatMessages(chatId: string) {
        return this.http.get<IResponse<IChatMessage[]>>(environment.api + `/chats/${chatId}/messages`);
    }

    public getUsersForChatting() {
        return this.http.get<IResponse<IUser[]>>(environment.api + `/chats/users`);
    }

    public create(chat: Partial<IChat>) {
        return this.http.post<IResponse<IChat>>(environment.api + `/chats`, chat)
    }

    public getChatFromUser(paramsId: string) {
        return this.http.get<IResponse<IChat>>(`${environment.api}/chats/profile/${paramsId}`);
    }
}
