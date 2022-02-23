import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import SwiperCore, { Virtual } from 'swiper';
import {SwiperComponent} from "swiper/angular";
import {PostsService} from "../../services/http/posts.service";
import {IPost} from "../../interfaces/IPost";
import {UsersService} from "../../services/http/users.service";
import {ModalController} from "@ionic/angular";
import {CommentsPage} from "../comments/comments.page";
import { Router } from '@angular/router';

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

    @ViewChildren("video")
    public videos: QueryList<ElementRef<HTMLVideoElement>>;

    public page: number = 0;
    public posts: IPost[] = [];

    constructor(
        private postsService: PostsService,
        private usersService: UsersService,
        private cd: ChangeDetectorRef,
        public modalController: ModalController,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.initSlides();
    }

    ionViewWillLeave() {
        this.posts = [];
        this.cd.detectChanges();
        this.handleVideo(-1);
    }

    public userProfile(postUserId: string) {
        this.usersService.userProfile(postUserId);
    }

    public async initSlides() {
        this.posts = [];
        await this.addSlides();
        this.handleVideo();
    }

    public addSlides(limit: number = 2) {
        return new Promise(resolve => {
            const seen = this.posts.map(s => s._id);
            this.postsService.search(limit, seen)
                .subscribe(response => {
                    if (response.success) {
                        this.posts.push(...response.data);
                        this.cd.detectChanges();
                    }
                    resolve(true);
                });
        });
    }

    public async slideChange(event) {
        const swipe = event[0];
        if (swipe.previousIndex < swipe.activeIndex) {
            if (swipe.activeIndex === this.posts.length - 1) {
                await this.addSlides(1);
            }
        }

        setTimeout(() => {
            const activeVideo = (swipe.activeIndex === 0) ? 0 : 1;
            this.handleVideo(activeVideo);
        }, 10);
    }

    public handleVideo(idx: number = 0) {
        for (let i = 0; i < this.videos.length; i++) {
            if (i === idx) {
                this.videos.get(i).nativeElement.volume = 1;
                this.videos.get(i).nativeElement.play();
            } else {
                this.videos.get(i).nativeElement.volume = 0;
                this.videos.get(i).nativeElement.currentTime = 0;
                this.videos.get(i).nativeElement.pause();
            }
        }
    }

    public toggleVideo(video: HTMLVideoElement) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    public togglePost(post: IPost) {
        this.postsService.like(post._id)
            .subscribe(response => {
                if (response.success) {
                    post.liked = response.data.liked;
                    post.likes = response.data.likes;
                }
            });
    }

    public follow(post: IPost) {
        this.usersService.follow(post.user._id)
            .subscribe(response => {
                if (response.success) {
                    post.user.following = true;
                }
            });
    }

    public async showComments(postId: string) {
        const modal = await this.modalController.create({
            component: CommentsPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'postId': postId
            },
            swipeToClose: true,
            breakpoints: [0, 1],
            initialBreakpoint: 1
        });
        return await modal.present();
    }
}
