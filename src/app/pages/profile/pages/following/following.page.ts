import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from 'src/app/services/http/users.service';

@Component({
	selector: 'app-following',
	templateUrl: './following.page.html',
	styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

	public users: IUser[] = [];

	constructor(
		private usersService: UsersService
	) { }

	ngOnInit() {
		this.users = this.usersService.following;
	}

}
