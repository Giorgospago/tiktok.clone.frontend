import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {CreateService} from "../../../../services/http/create.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UploadService} from "../../../../services/http/upload.service";
import {HttpResponse} from "@angular/common/http";
import {IResponse} from "../../../../interfaces/IReponse";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    @ViewChild("VideoEl")
    public VideoRef: ElementRef<HTMLVideoElement>;

    public form: FormGroup;
    public thumbnailUrl: string = "";

    constructor(
        public createService: CreateService,
        private domSanitizer: DomSanitizer,
        private fb: FormBuilder,
        private uploadService: UploadService
    ) {
    }

    get path() {
        return this.createService.videoInput.live || this.domSanitizer
            .bypassSecurityTrustUrl(this.createService.videoInput.path);
    }

    ngOnInit() {
        this.initForm();
    }

    ionViewWillEnter() {
        this.initVideoMethods();
    }

    public initVideoMethods() {
        if (this.createService.videoInput.file) {
            this.createService.uploadVideo();
        }
        this.VideoRef.nativeElement.currentTime = 0.5;
    }

    public onTimeUpdate(event) {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = 1080;
        canvas.height = 1920;
        const canvasCtx = canvas.getContext("2d");
        canvasCtx.drawImage(this.VideoRef.nativeElement, 0, 0, 1080, 1920);
        canvas.toBlob((blob) => {
            const file = new File([blob], 'img-thumbnail.jpg');
            this.uploadService.uploadFile(file)
                .subscribe((event) => {
                    if (event instanceof HttpResponse) {
                        const response = event.body as IResponse<any>;
                        if (response.success) {
                            this.thumbnailUrl = response.data.location;
                        }
                    }
                })
        });
    }

    public initForm() {
        this.form = this.fb.group({
            tags: [[]],
            description: [""],
            scope: ["public"]
        });

        this.form.get("description").valueChanges
            .subscribe((data) => {
                let hashtags = data.match(/#[\p{L}\d\-_]+/ugi);
                hashtags = (hashtags || []).map(tag => tag.replace("#", ""));
                this.form.get("tags").setValue(hashtags);
            });
    }

    public uploadPost() {
        const data = {
            ...this.form.value,
            videoUrl: this.createService.videoInput.live,
            thumbnailUrl: this.thumbnailUrl
        };
        if (this.createService.videoInput.audio) {
            data.audio = this.createService.videoInput.audio._id;
            data.videoVolume = 0;
        }
        this.createService.uploadPost(data);
    }
}
