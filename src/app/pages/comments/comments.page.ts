import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PostsService} from "../../services/http/posts.service";
import {IComment} from "../../interfaces/IComment";
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../interfaces/IUser";
import {UsersService} from 'src/app/services/http/users.service';

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

    @Input()
    public postUserId: string;

    public commentText: string = "";
    public replyComment: IComment;

    public comments: IComment[] = [];

    constructor(
        private modalController: ModalController,
        private postsService: PostsService,
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.initComments();
    }

    public userProfile(commentUserId: string) {
        this.dismiss();
        this.usersService.userProfile(commentUserId);
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
        this.postsService.addComment(this.postId, this.commentText, this.replyComment?._id)
            .subscribe(response => {
                if (response.success) {
                    this.initComments();
                }
            });
    }

    public replyTo(comment: IComment) {
        this.replyComment = comment;
    }

    public cancelReply() {
        this.replyComment = null;
    }
}
