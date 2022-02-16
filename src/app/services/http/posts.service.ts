import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {IPost} from "../../interfaces/IPost";
import {IComment} from "../../interfaces/IComment";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(
        private http: HttpClient,
        private ls: LocalStorageService
    ) {
    }

    public search(limit: number, seen: string[] = []) {
        return this.http.post<IResponse<IPost[]>>(environment.api + "/posts/search", {
            limit, seen
        });
    }

    public like(postId: string) {
        return this.http.get<IResponse<any>>(environment.api + `/posts/${postId}/like`);
    }

    public getComments(postId: string) {
        return this.http.get<IResponse<IComment[]>>(environment.api + `/posts/${postId}/comments`);
    }

    public addComment(postId: string, text: string, commentId?: string) {
        return this.http.post<IResponse<any>>(environment.api + `/posts/${postId}/comments`, {
            post: postId,
            text: text,
            comment: commentId
        });
    }

}
