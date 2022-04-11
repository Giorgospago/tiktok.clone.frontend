import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AudioService} from "../../services/http/audio.service";
import {IAudio} from "../../interfaces/IAudio";

@Component({
    selector: 'app-audio',
    templateUrl: './audio.page.html',
    styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {

    public audioId: string = "";
    public audio: IAudio = null;
    public youtube: string = "";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private audioService: AudioService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(async (params) => {
           this.audioId = params.audioId;
           this.init();
        });
    }

    public init() {
        this.audioService.getAudio(this.audioId)
            .subscribe(response => {
                if (response.success) {
                    this.audio = response.data;
                    this.findYoutubeVideo();
                }
            })
    }

    public findYoutubeVideo() {
        if (this.audio?.meta?.lyrics?.media) {
            const media = JSON.parse(this.audio.meta.lyrics.media);
            if (Array.isArray(media)) {
                for (const obj of media) {
                    switch (obj.provider) {
                        case "youtube":
                            this.youtube = this.youtubeParser(obj.url);
                            break;
                    }
                }
            }
        }
    }

    public youtubeParser(url){
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

}
