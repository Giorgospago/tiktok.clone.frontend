import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastService} from "../general/toast.service";
import {IResponse} from "../../interfaces/IReponse";
import {IUploadPost} from "../../interfaces/IPost";
import {Router} from "@angular/router";
import {UploadService} from "./upload.service";

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    public percentage = 0;
    public videoInput = {
        file: null,
        path: "",
        live: ""
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private toast: ToastService,
        private uploadService: UploadService
    ) {
    }

    public selectFromVideoInput(event) {
        this.videoInput.file = event.target.files[0];
        this.videoInput.path = URL.createObjectURL(event.target.files[0]);
    }

    public resetVideoInput() {
        this.videoInput = {
            file: null,
            path: "",
            live: ""
        };
    }

    public uploadVideo() {
        this.percentage = 0;
        this.uploadService.uploadFile(this.videoInput.file)
            .subscribe((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
                this.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                const response: IResponse<any> = event.body;
                if (response.success) {
                    this.percentage = 100;
                    this.videoInput.live = response.data.location;
                    this.toast.toast({
                        header: "Success",
                        message: response.message,
                        color: "success",
                        duration: 10000,
                        icon: "checkmark"
                    });
                }
            }
        });
    }

    public uploadPost(form: IUploadPost) {
        this.http
            .post(environment.api + "/posts/create", form)
            .subscribe(response => {
                this.resetVideoInput();
                this.router.navigate(["/profile"]);
            });
    }

}
