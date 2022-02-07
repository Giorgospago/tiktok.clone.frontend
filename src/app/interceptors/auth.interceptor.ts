import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from "ngx-webstorage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private ls: LocalStorageService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.ls.retrieve("token");
        const authReq = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(authReq);
    }
}
