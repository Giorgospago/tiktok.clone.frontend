import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PostsService} from "../../services/http/posts.service";
import {IComment} from "../../interfaces/IComment";
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.page.html',
    styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

    @LocalStorage()
    public user: IUser;

    @Input()
    public postId: string;

    public commentText: string = "";

    public comments: IComment[] = [];

    constructor(
        private modalController: ModalController,
        private postsService: PostsService
    ) {
    }

    ngOnInit() {
        this.initComments();
    }

    public initComments() {
        this.postsService.getComments(this.postId)
            .subscribe(response => {
                if (response.success) {
                    this.comments = response.data;
                }
            });
    }

    public dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }

    public setCommentText(event) {
        this.commentText = event.detail.value;
    }

    public addComment() {
        this.postsService.addComment(this.postId, this.commentText)
            .subscribe(response => {
                if (response.success) {

                    this.initComments();
                }
            });
    }
}
