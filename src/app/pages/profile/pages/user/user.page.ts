import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from 'src/app/services/http/users.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.page.html',
	styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

	public user: IUser;
	public segment: string = "";

	constructor(
		private usersService: UsersService,
		private router: Router
	) { }

	ngOnInit() {
		this.user = this.usersService.user;

		this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				if (val.url === `/profile/${this.user._id}`) { val.url += "/"; }
				this.segment = val.url.replace(`/profile/${this.user._id}`, "");
			}
		});
	}

	public segmentChanged(event) {
		console.log(event);
		const url = `/profile/${this.user._id}/${event.detail.value}`;
		this.router.navigate([url]);
	}

}
