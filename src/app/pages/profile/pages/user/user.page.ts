import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from 'src/app/services/http/users.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.page.html',
	styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

	public user: IUser;
	public id: string = "";

	constructor(
		private usersService: UsersService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = params.id;
			this.userProfile();
		});
	}

	private userProfile() {
		this.usersService.userProfile(this.id)
			.subscribe(response => {
				if (response.success) {
					this.user = response.data;
				}
			});
	}
}
