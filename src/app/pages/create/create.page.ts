import { Component, OnInit } from '@angular/core';
import {CreateService} from "../../services/http/create.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
      public createService: CreateService
  ) { }

  ngOnInit() {
  }

}
