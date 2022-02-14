import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import SwiperCore, { Virtual } from 'swiper';
import {SwiperComponent} from "swiper/angular";
import {PostsService} from "../../services/http/posts.service";
import {IPost} from "../../interfaces/IPost";

// install Swiper modules
SwiperCore.use([Virtual]);

@Component({
    selector: 'app-foryou',
    templateUrl: './foryou.page.html',
    styleUrls: ['./foryou.page.scss'],
})
export class ForyouPage implements OnInit {

    @ViewChild("TikTokSlides", {static: false})
    public TikTokSlides: SwiperComponent;

    public page: number = 0;
    public slides: IPost[] = [];

    constructor(
        private postsService: PostsService,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.initSlides();
    }

    public initSlides() {
        this.slides = [];
        this.addSlides();
    }

    public addSlides(limit: number = 2) {
        // const seen = [];
        // for (let post of this.slides) {
        //     seen.push(post._id);
        // }
        const seen = this.slides.map(s => s._id);
        this.postsService.search(limit, seen)
            .subscribe(response => {
                if (response.success) {
                    this.slides.push(...response.data);
                    this.cd.detectChanges();
                }
            });
    }

    public slideChange(event) {
        const swipe = event[0];
        if (swipe.previousIndex < swipe.activeIndex) {
            if (swipe.activeIndex === this.slides.length - 1) {
                this.addSlides(1);
            }
        }
    }

    getRandomInt() {
        return Math.floor(Math.random() * 1000);
    }

}
