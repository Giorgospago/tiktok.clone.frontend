import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    public videoInput = {
        file: null,
        path: ""
    };

    constructor() {
    }

    public selectFromVideoInput(event) {
        this.videoInput.file = event.target.files[0];
        this.videoInput.path = URL.createObjectURL(event.target.files[0]);
    }

}
