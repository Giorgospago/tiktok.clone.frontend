import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient
    ) {
    }

    public uploadFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);

         const req = new HttpRequest(
            'POST',
            environment.api + "/upload",
             formData,
            {reportProgress: true}
        );

        return this.http.request(req)
    }

}
