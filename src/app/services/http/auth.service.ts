import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthLoginData, IAuthLoginResult, IAuthRegisterData} from "../../interfaces/auth";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {LocalStorageService} from "ngx-webstorage";
import {FireService} from "../general/fire.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public deviceToken: string = "";

    constructor(
        private http: HttpClient,
        private fire: FireService,
        private ls: LocalStorageService
    ) {
    }

    public login(data: IAuthLoginData) {
        return this.http.post<IResponse<IAuthLoginResult>>(`${environment.api}/auth/login`, data);
    }

    public register(data: IAuthRegisterData) {
        return this.http.post<IResponse<IAuthLoginResult>>(`${environment.api}/auth/register`, data);
    }

    public async logout() {
        this.http.post(`${environment.api}/auth/logout`, {
            token: this.deviceToken
        }).subscribe();
        this.ls.clear("token");
        this.ls.clear("user");
        await this.fire.logout();
    }
}
