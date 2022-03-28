import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../interfaces/IPost";

@Component({
    selector: 'app-video-wall',
    templateUrl: './video-wall.component.html',
    styleUrls: ['./video-wall.component.scss'],
})
export class VideoWallComponent implements OnInit {

    @Input()
    public posts: IPost[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    itemTrackBy(index, item: IPost) {
        return item._id;
    }

    loadData(event) {
        console.log(event);
    }
}
