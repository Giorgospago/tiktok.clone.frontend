import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {IPost} from "../../interfaces/IPost";

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

}
