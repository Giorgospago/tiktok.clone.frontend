import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FollowComponent} from "./follow.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
      FollowComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        FollowComponent
    ]
})
export class FollowModule { }
