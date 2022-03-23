import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { IResponse } from "../../interfaces/IReponse";
import { LocalStorageService } from "ngx-webstorage";
import { IUser } from "../../interfaces/IUser";
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import {IPost} from "../../interfaces/IPost";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public user: IUser;
    public following: IUser[] = [];

    constructor(
        private http: HttpClient,
        private ls: LocalStorageService,
        private router: Router
    ) {
    }

    public me() {
        return this.http
            .get<IResponse<IUser>>(`${environment.api}/users/me`)
            .pipe(
                tap(response => {
                    if (response.success) {
                        this.ls.store("user", response.data);
                    }
                })
            );
    }

    public follow(userId: string) {
        return this.http.get<IResponse<any>>(environment.api + '/users/follow/' + userId);
    }

    public favorites() {
        return this.http.get<IResponse<IPost[]>>(environment.api + '/users/favorites');
    }

    public userProfile(userPostId: string) {
        return this.http.get<IResponse<IUser>>(`${environment.api}/users/profile/${userPostId}`);
    }

    public userFollowing(userId: string) {
        return this.http.get<IResponse<IUser[]>>(`${environment.api}/users/profile/${userId}/following`);
    }

    public userFollowers(userId: string) {
        return this.http.get<IResponse<IUser[]>>(`${environment.api}/users/profile/${userId}/followers`);
    }

    public unfollowFollowers(userId: string) {
        return this.http.get<IResponse<IUser>>(`${environment.api}/users/unfollow/followers/${userId}`);
    }

    public unfollowFollowing(userId: string) {
        return this.http.get<IResponse<IUser>>(`${environment.api}/users/unfollow/following/${userId}`);
    }

    public addDeviceToken(token: string) {
        return this.http.post<IResponse<any>>(environment.api + '/users/add-device-token', {token});
    }
}
