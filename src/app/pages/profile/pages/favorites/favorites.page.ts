import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/http/users.service";
import {IPost} from "../../../../interfaces/IPost";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    public posts: IPost[] = [];

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.fetchFavorites();
    }

    public fetchFavorites() {
        this.usersService
            .favorites()
            .subscribe((response) => {
                if (response.success) {
                    this.posts = response.data;
                }
            });
    }

}
