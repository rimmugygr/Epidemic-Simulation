import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundPageComponent} from "./component/not-found-page/not-found-page.component";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [
    CommonModule,
    NotFoundPageComponent
  ]
})
export class SharedModule { }
