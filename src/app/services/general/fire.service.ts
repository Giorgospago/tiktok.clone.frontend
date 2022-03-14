import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginType} from "../../interfaces/auth";

@Injectable({
    providedIn: 'root'
})
export class FireService {

    constructor(
        private http: HttpClient,
        public auth: AngularFireAuth
    ) {
        this.auth.user.subscribe((user) => {
            // console.log("Authenticated user");
            // console.log(user);
        });
    }

    public async socialLogin(type: LoginType) {
        let provider;
        switch (type) {
            case "google":
                provider = firebase.auth.GoogleAuthProvider;
                break;
            case "facebook":
                provider = firebase.auth.FacebookAuthProvider;
                break;
        }


        const result = await this.auth.signInWithPopup(new provider());
        // @ts-ignore
        const token = result.user.multiFactor.user.accessToken;
        return this.http.post(environment.api + `/auth/social-login`, {token: token});
    }

    public async logout() {
        this.auth.signOut();
    }
}
