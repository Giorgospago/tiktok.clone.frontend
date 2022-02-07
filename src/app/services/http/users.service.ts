import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {LocalStorageService} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private http: HttpClient,
        private ls: LocalStorageService
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

}
