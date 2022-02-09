import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import SwiperCore, { Virtual } from 'swiper';
import {SwiperComponent} from "swiper/angular";

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
    public slides = [];

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.initSlides();
    }

    public initSlides() {
        this.slides.push(
            {name: "Slide " + this.getRandomInt()},
            {name: "Slide " + this.getRandomInt()}
        );
    }

    public slideChange(event) {
        const swipe = event[0];
        if (swipe.previousIndex < swipe.activeIndex) {
            // this.slides.push({name: "Slide " + this.getRandomInt()});
            // if (this.slides.length > 3) {
            //     this.slides.shift();
            //     this.TikTokSlides.swiperRef.slidePrev();
            // }
            console.log("next");
        } else {
            console.log("previous");
        }
        this.cd.detectChanges();
    }

    getRandomInt() {
        return Math.floor(Math.random() * 1000);
    }

}
