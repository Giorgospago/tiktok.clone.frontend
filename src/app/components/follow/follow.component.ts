import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/IUser";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit {
    @Input("user")
    public user: IUser;

  constructor() { }

  ngOnInit() {}

}
