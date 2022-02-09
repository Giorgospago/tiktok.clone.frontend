import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {CreateService} from "../../../../services/http/create.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    public form: FormGroup;

    constructor(
        public createService: CreateService,
        private domSanitizer: DomSanitizer,
        private fb: FormBuilder
    ) {
    }

    get path() {
        return this.createService.videoInput.live || this.domSanitizer
            .bypassSecurityTrustUrl(this.createService.videoInput.path);
    }

    ngOnInit() {
        this.initForm();
        if (this.createService.videoInput.file) {
            this.createService.uploadVideo();
        }
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
            videoUrl: this.createService.videoInput.live
        };
        this.createService.uploadPost(data);
    }
}
