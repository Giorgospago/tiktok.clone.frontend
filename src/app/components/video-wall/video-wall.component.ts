import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../interfaces/IPost";
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {PostsService} from "../../services/http/posts.service";
import {AlertController} from "@ionic/angular";
import {UsersService} from "../../services/http/users.service";

@Component({
    selector: 'app-video-wall',
    templateUrl: './video-wall.component.html',
    styleUrls: ['./video-wall.component.scss'],
})
export class VideoWallComponent implements OnInit {

    @LocalStorage("user")
    public user: IUser;

    @Input()
    public posts: IPost[] = [];

    constructor(
        private alertController: AlertController,
        private postsService: PostsService,
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
    }

    itemTrackBy(index, item: IPost) {
        return item._id;
    }

    loadData(event) {
        console.log(event);
    }

    async removePost(postId: string) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Danger',
            message: 'Are you sure ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    id: 'cancel-button',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Delete',
                    id: 'confirm-button',
                    handler: () => {
                        this.postsService
                            .removeById(postId)
                            .subscribe(() => {
                                this.usersService.me().subscribe();
                            });
                    }
                }
            ]
        });
        await alert.present();
    }
}
