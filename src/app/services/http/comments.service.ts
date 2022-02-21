import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../../interfaces/IReponse";
import {IComment} from "../../interfaces/IComment";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    public open: any = {};

    constructor(
        private http: HttpClient,
    ) {
    }

    public getReplies(commentId: string) {
        return this.http.get<IResponse<IComment[]>>(environment.api + `/comments/${commentId}/replies`);
    }

}
