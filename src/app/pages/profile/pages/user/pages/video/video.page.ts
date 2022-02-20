import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from 'src/app/services/http/users.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  public user: IUser;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.user = this.usersService.user;
  }

}
