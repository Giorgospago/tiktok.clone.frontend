import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {CreateService} from "../../../../services/http/create.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

    constructor(
        public createService: CreateService,
        private domSanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
    }

    get path() {
        return this.domSanitizer.bypassSecurityTrustUrl(this.createService.videoInput.path);
    }

}
