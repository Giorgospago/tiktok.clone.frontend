import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {LocalStorageService} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {tap} from "rxjs/operators";
import { Router } from '@angular/router';

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

    public userProfile(userPostId: string) {
        return this.http.get<IResponse<any>>(`${environment.api}/users/profile/${userPostId}`)
            .subscribe(response => {
                if (response.success) {
                    this.user = response.data;
                    this.router.navigate([`profile/${userPostId}`]);
                }
            });
    }

    public userFollowing(userId: string) {
        return this.http.get<IResponse<IUser[]>>(`${environment.api}/users/profile/${userId}/following`);
    }
}
