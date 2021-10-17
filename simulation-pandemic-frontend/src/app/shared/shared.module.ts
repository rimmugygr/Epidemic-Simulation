import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundPageComponent} from "./component/not-found-page/not-found-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TextInputComponent } from './component/text-input/text-input.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NotFoundPageComponent,
    TextInputComponent
  ],
    imports: [
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
    ],
  exports: [
    ReactiveFormsModule,
    NgbModule,
    NotFoundPageComponent,
    TextInputComponent
  ]
})
export class SharedModule { }
