import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "ngx-webstorage";
import {AuthService} from "../services/http/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private ls: LocalStorageService,
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const token = this.ls.retrieve("token");
        if (token) {
            return true;
        }

        this.authService.logout();
        this.router.navigate(["/login"]);
        return false;
    }

}
