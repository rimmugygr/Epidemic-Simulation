import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundPageComponent} from "./component/not-found-page/not-found-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    NotFoundPageComponent
  ]
})
export class SharedModule { }
