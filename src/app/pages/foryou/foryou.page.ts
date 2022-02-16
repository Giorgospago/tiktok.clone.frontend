import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import SwiperCore, { Virtual } from 'swiper';
import {SwiperComponent} from "swiper/angular";
import {PostsService} from "../../services/http/posts.service";
import {IPost} from "../../interfaces/IPost";
import {UsersService} from "../../services/http/users.service";
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {ModalController} from "@ionic/angular";
import {CommentsPage} from "../comments/comments.page";

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

    // @LocalStorage("user")
    // public user: IUser;

    public page: number = 0;
    public posts: IPost[] = [];

    constructor(
        private postsService: PostsService,
        private usersService: UsersService,
        private cd: ChangeDetectorRef,
        public modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.initSlides();
    }

    public initSlides() {
        this.posts = [];
        this.addSlides();
    }

    public addSlides(limit: number = 2) {
        // const seen = [];
        // for (let post of this.slides) {
        //     seen.push(post._id);
        // }
        const seen = this.posts.map(s => s._id);
        this.postsService.search(limit, seen)
            .subscribe(response => {
                if (response.success) {
                    this.posts.push(...response.data);
                    this.cd.detectChanges();
                }
            });
    }

    public slideChange(event) {
        const swipe = event[0];
        if (swipe.previousIndex < swipe.activeIndex) {
            if (swipe.activeIndex === this.posts.length - 1) {
                this.addSlides(1);
            }
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
