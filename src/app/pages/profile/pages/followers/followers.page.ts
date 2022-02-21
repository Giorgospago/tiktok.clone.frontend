import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/http/users.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    console.log(this.usersService.following);
  }

}
