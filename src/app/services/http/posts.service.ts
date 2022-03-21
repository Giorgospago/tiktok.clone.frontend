import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {IPost, IPostSearchOptions, IPostTextSearchOptions, IPostTextSearchResult} from "../../interfaces/IPost";
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

    public search(options: IPostSearchOptions) {
        return this.http.post<IResponse<IPost[]>>(environment.api + "/posts/search", options);
    }

    public textSearch(options: IPostTextSearchOptions) {
        return this.http.post<IResponse<IPostTextSearchResult>>(environment.api + "/posts/text-search", options);
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

    public storeNewView(view: any) {
        return this.http.post<IResponse<any>>(environment.api + `/posts/view`, view);
    }

}
