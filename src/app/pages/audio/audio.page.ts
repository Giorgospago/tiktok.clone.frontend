import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AudioService} from "../../services/http/audio.service";
import {IAudio} from "../../interfaces/IAudio";
import {IPost} from "../../interfaces/IPost";
import {PostsService} from "../../services/http/posts.service";

@Component({
    selector: 'app-audio',
    templateUrl: './audio.page.html',
    styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {

    public audioId: string = "";
    public audio: IAudio = null;
    public youtube: string = "";
    public audioPreview: string = "";
    public lyrics: string = "";
    public toggleLyrics: boolean = false;
    public badges: string[] = [];

    public links = {
        apple: "",
        spotify: "",
        all: ""
    };

    public posts: IPost[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private audioService: AudioService,
        private postsService: PostsService
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
                    this.parseMetaData();
                }
            });

        this.postsService.search({audios: [this.audioId], limit: 9}).subscribe(response => {
            if (response.success) {
                this.posts = response.data;
            }
        });
    }

    public parseMetaData() {
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

        if (this.audio?.meta?.apple_music?.previews?.length) {
            this.audioPreview = this.audio.meta.apple_music.previews[0].url;
        }

        if (this.audio?.meta?.lyrics?.lyrics) {
            this.lyrics = this.audio.meta.lyrics.lyrics;
        }

        if (this.audio?.meta?.apple_music?.genreNames) {
            this.badges = this.audio.meta.apple_music.genreNames;
        }

        if (this.audio?.meta?.apple_music?.url) {
            this.links.apple = this.audio.meta.apple_music.url;
        }

        if (this.audio?.meta?.spotify?.external_urls?.spotify) {
            this.links.spotify = this.audio.meta.spotify.external_urls.spotify;
        }

        if (this.audio?.meta?.song_link) {
            this.links.all = this.audio.meta.song_link;
        }
    }

    public youtubeParser(url){
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

}
