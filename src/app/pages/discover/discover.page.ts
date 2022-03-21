import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, filter, map, switchMap} from "rxjs";
import {PostsService} from "../../services/http/posts.service";
import {IPost} from "../../interfaces/IPost";
import {IUser} from "../../interfaces/IUser";
import {IComment} from "../../interfaces/IComment";

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

    public posts: IPost[] = [];
    public users: IUser[] = [];
    public comments: IComment[] = [];

    public searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(
        private postsService: PostsService
    ) {
    }

    ngOnInit() {
        this.clearSearch();
        this.searchValue$
            .pipe(
                map(x => x
                    .trim()
                    .replace(/\s\s+/g, ' ')
                ),
                filter((x) => {
                    if (!!x && x.length > 2) {
                        return true;
                    } else {
                        this.clearSearch();
                        return false;
                    }
                }),
                switchMap(key => this.postsService.textSearch({key}))
            )
            .subscribe((response) => {
                if (response.success) {
                    this.posts = response.data.posts;
                    this.users = response.data.users;
                    this.comments = response.data.comments;
                }
            });
    }

    public search(event) {
        this.searchValue$.next(event.detail.value);
    }

    public clearSearch() {
        this.posts = [];
        this.users = [];
        this.comments = [];
        // TODO fetch recent posts
    }

}
