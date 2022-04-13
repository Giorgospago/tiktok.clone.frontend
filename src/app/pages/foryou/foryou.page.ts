import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import SwiperCore, { Virtual } from 'swiper';
import { SwiperComponent } from "swiper/angular";
import { PostsService } from "../../services/http/posts.service";
import { IPost } from "../../interfaces/IPost";
import { UsersService } from "../../services/http/users.service";
import { ModalController } from "@ionic/angular";
import { CommentsPage } from "../comments/comments.page";
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
// import {SocialSharing} from '@awesome-cordova-plugins/social-sharing/ngx';
// import {environment} from "../../../environments/environment";
import {SharePage} from "../share/share.page";

// install Swiper modules
SwiperCore.use([Virtual]);

@Component({
    selector: 'app-foryou',
    templateUrl: './foryou.page.html',
    styleUrls: ['./foryou.page.scss'],
})
export class ForyouPage implements OnInit {

    public isPaused: boolean = false;
    public tempPostId: string = "";
    public startTime: Date;
    public isHere = false;

    @HostListener("document:keydown", ["$event"])
    public onKeyDown(event) {
        if (!this.isHere) return;

        switch (event.key) {
            case "ArrowUp":
                this.TikTokSlides.swiperRef.slidePrev();
                break;
            case "ArrowDown":
                this.TikTokSlides.swiperRef.slideNext();
                break;
        }
    }

    @ViewChild("playButton", { static: false })
    public playButton: ElementRef<HTMLElement>;

    @ViewChild("TikTokSlides", { static: false })
    public TikTokSlides: SwiperComponent;

    @ViewChild("PostAudioRef", { static: true })
    public PostAudioRef: ElementRef<HTMLAudioElement>;

    @ViewChildren("video")
    public videos: QueryList<ElementRef<HTMLVideoElement>>;


    public page: number = 0;
    public posts: IPost[] = [];

    private _sub: Subscription;

    constructor(
        private postsService: PostsService,
        private usersService: UsersService,
        private cd: ChangeDetectorRef,
        public modalController: ModalController,
        private router: Router,
        private route: ActivatedRoute,
        // private socialSharing: SocialSharing
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.isHere = true;
        this._sub = this.route.params
            .subscribe(async (params) => {
                if (params.postId) {
                    this.posts = [];
                    await this.addSlides(1, [params.postId]);
                    this.handleVideo(0, params.postId);
                } else {
                    await this.initSlides();
                }
            });
    }

    ionViewWillLeave() {
        this.isHere = false;
        this.posts = [];
        this.cd.detectChanges();
        this.handleVideo(-1);
        this._sub.unsubscribe();
    }

    public async initSlides() {
        this.posts = [];
        await this.addSlides();
        this.tempPostId = this.posts?.[0]?._id;
        this.startTime = new Date();

        this.handleVideo(0, this.tempPostId);
    }

    public addSlides(limit: number = 2, ids?: string[]) {
        return new Promise(resolve => {
            const seen = this.posts.map(s => s._id);
            this.postsService.search({
                limit,
                seen,
                ids
            })
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
        this.isPaused = false;
        const swipe = event[0];
        if (swipe.previousIndex < swipe.activeIndex) {
            if (swipe.activeIndex === this.posts.length - 1) {
                await this.addSlides(1);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 10));

        let postId = null;
        const actives = Array.from(document.querySelectorAll(".swiper-slide-active"));
        if (actives.length) {
            const activeVideo = actives[0].querySelector('video');
            if (activeVideo) {
                const postId = activeVideo.getAttribute('postId');
                const view = {
                    enteredAt: this.startTime,
                    leftAt: new Date(),
                    post: this.tempPostId
                };
                this.postsService.storeNewView(view).subscribe();

                this.tempPostId = postId;
                this.startTime = new Date();
            }
        }

        setTimeout(() => {
            const activeVideo = (swipe.activeIndex === 0) ? 0 : 1;
            this.handleVideo(activeVideo, postId);
        }, 10);
    }

    public handleVideo(idx: number = 0, postId?: string) {
        this.audioStop();

        for (let i = 0; i < this.videos.length; i++) {
            if (i === idx) {
                let videoVolume = 1;
                if (postId) {
                    const post = this.posts.find(p => p._id === postId);
                    if (post && post.audio) {
                        videoVolume = post.videoVolume;
                        if (videoVolume === 0) {
                            this.PostAudioRef.nativeElement.src = post.audio.url;
                            this.PostAudioRef.nativeElement.play();
                        }
                    }
                }

                this.videos.get(i).nativeElement.volume = videoVolume;
                this.videos.get(i).nativeElement.play();
                this.isPaused = false;
            } else {
                this.videos.get(i).nativeElement.volume = 0;
                this.videos.get(i).nativeElement.currentTime = 0;
                this.videos.get(i).nativeElement.pause();
            }
        }
    }

    public audioStop() {
        this.PostAudioRef.nativeElement.pause();
        this.PostAudioRef.nativeElement.currentTime = 0;
    }

    public toggleVideo(video: HTMLVideoElement) {
        if (video.paused) {
            video.play();
            this.PostAudioRef.nativeElement.play();
            this.isPaused = false;
        } else {
            video.pause();
            this.PostAudioRef.nativeElement.pause();
            this.isPaused = true;
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

    public async showComments(postId: string, postUserId: string) {
        const modal = await this.modalController.create({
            component: CommentsPage,
            cssClass: 'my-custom-class',
            componentProps: {
                'postId': postId,
                'postUserId': postUserId
            },
            swipeToClose: true,
            breakpoints: [0, 1],
            initialBreakpoint: 1
        });
        return await modal.present();
    }

    public async share(post: IPost) {
        // const url = `${environment.host}/video/${post._id}`;
        // await this.socialSharing.share(
        //     post.description,
        //     `Check ${post.user.name}'s awesome video`,
        //     post.videoUrl,
        //     url
        // );

        const modal = await this.modalController.create({
            component: SharePage,
            cssClass: 'my-custom-class',
            componentProps: {
                'postId': post._id
            },
            swipeToClose: true,
            breakpoints: [0, 0.5],
            initialBreakpoint: 0.5
        });
        return await modal.present();
    }
}
