import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../interfaces/IComment";
import {CommentsService} from "../../services/http/comments.service";

@Component({
    selector: 'app-deep-comments',
    templateUrl: './deep-comments.component.html',
    styleUrls: ['./deep-comments.component.scss'],
})
export class DeepCommentsComponent implements OnInit {

    @Input("comments")
    public comments: IComment[] = [];

    @Input("parent")
    public parent: string;

    @Output("clicked")
    public clicked: EventEmitter<IComment> = new EventEmitter<IComment>();

    constructor(
        public cs: CommentsService
    ) {
    }

    ngOnInit() {
        if (this.parent) {
            this.cs.getReplies(this.parent)
                .subscribe(response => {
                    if (response.success) {
                        this.comments = response.data;
                    }
                });
        }
    }

    public emitReply(comment: IComment) {
        this.clicked.emit(comment);
    }
}
