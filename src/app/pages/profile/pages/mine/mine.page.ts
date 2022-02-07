import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "ngx-webstorage";
import {IUser} from "../../../../interfaces/IUser";

@Component({
    selector: 'app-mine',
    templateUrl: './mine.page.html',
    styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

    @LocalStorage("user", {})
    public user: IUser;

    constructor() {
    }

    ngOnInit() {
    }

}
