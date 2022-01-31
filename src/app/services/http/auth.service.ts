import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthLoginData, IAuthLoginResult, IAuthRegisterData} from "../../interfaces/auth";
import {environment} from "../../../environments/environment";
import {IResponse} from "../../interfaces/IReponse";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private ls: LocalStorageService
    ) {
    }

    public login(data: IAuthLoginData) {
        return this.http.post<IResponse<IAuthLoginResult>>(`${environment.api}/auth/login`, data);
    }

    public register(data: IAuthRegisterData) {
        return this.http.post<IResponse<IAuthLoginResult>>(`${environment.api}/auth/register`, data);
    }

    public logout() {
        this.http.get(`${environment.api}/auth/logout`).subscribe();
        this.ls.clear("token");
        this.ls.clear("user");
    }
}
